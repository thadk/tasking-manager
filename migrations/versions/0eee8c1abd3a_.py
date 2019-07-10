"""empty message

Revision ID: 0eee8c1abd3a
Revises: fcd9cebaa79c
Create Date: 2019-05-24 23:05:45.512395

"""
from alembic import op
from sqlalchemy.dialects.postgresql import ARRAY
import sqlalchemy as sa

import json
from geoalchemy2.shape import to_shape
from shapely.geometry import shape
import shapely.wkt



# revision identifiers, used by Alembic.
revision = '0eee8c1abd3a'
down_revision = '451f6bd05a19'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    print('Populating country information for Projects....')
    op.add_column('projects', sa.Column('country', ARRAY(sa.String()), nullable=True))

    fetch_all_project_geoms = "SELECT id, ST_AsText(ST_GeomFromWKB(ST_AsEWKB(geometry))) from projects;"
    projects = conn.execute(fetch_all_project_geoms)
    count = 0

    for project in projects:
        project_id = project[0]
        project_polygon = shapely.wkt.loads(project[1])
        with open('migrations/countries.json') as countries_data:
            countries = json.load(countries_data)
            if not project_polygon.is_valid:
                project_polygon = project_polygon.buffer(0)

            for country in countries['features']:
                country_polygon = shape(country['geometry'])
                is_match = project_polygon.within(country_polygon)
                if is_match:
                    count = count + 1
                    update_country_info = "update projects " + \
                                      "set country = array_append(country, '" + country['properties']['ADMIN'] + \
                                      "') where id = " + str(project_id)

                    op.execute(update_country_info)


def downgrade():
    op.drop_column('projects', 'country')

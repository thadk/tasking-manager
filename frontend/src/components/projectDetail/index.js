import React, {useState} from 'react';
import { Link } from '@reach/router';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import ReactPlaceholder from 'react-placeholder';
import marked from 'marked'
import DOMPurify from 'dompurify'

import messages from './messages';
import { getEditors } from '../../utils/editorsList';
import { PriorityBox, getLogoClass } from '../projectcard/projectCard';
import ProjectProgressBar from '../projectcard/projectProgressBar';
import DueDateBox from '../projectcard/dueDateBox';
import { MappingLevelMessage } from '../mappingLevel';

import { RoadIcon, HomeIcon, WavesIcon, TaskIcon } from '../svgIcons';
import { Dropdown } from '../dropdown';
import { Button } from '../button';

import { ChevronDownIcon, ShareIcon, FlagIcon } from '../svgIcons';

/* per https://stackoverflow.com/a/34688574/272018 */
const htmlFromMarkdown = markdownText => (
    {'__html': DOMPurify.sanitize(marked(markdownText))}
    )

export function BigProjectTeaser({ lastUpdated, totalContributors, className, littleFont="f7", bigFont="f6" }: Object) {
    /* outerDivStyles must have f6 even if sub-divs have f7 to fix grid issues*/
    const outerDivStyles = 'f6 tl blue-grey truncate mb2';
    
    return (
        <div className="cf">
            <div className={`fl ${outerDivStyles} ${className}`}>
                <span className={`${littleFont} blue-light`}>
                <FormattedMessage
                    {...messages['projectTotalContributors']}
                    values={{ number: <span className={`blue-grey b ${bigFont}`}>{totalContributors || 0}</span> }}
                />
                </span>
            </div>
            <div className={`fr ${outerDivStyles} ${className}`}>
                <span className={littleFont}>
                <FormattedMessage {...messages['projectLastContribution']} />{' '}
                <FormattedRelative value={lastUpdated} />
                </span>
            </div>
        </div>
    );
}

function BigProjectOrgLogo(organisationTag) {
    return (
        <div className="bg-black pa1" style={{ filter: 'invert(1)' }}>
        <div
            title={organisationTag.organisationTag}
            className={`contain ${getLogoClass(organisationTag)} w5 h2`}
        ></div>
        </div>
    );
    }

export const ShowReadMoreButton = props => {
    const [isShowing, setShowing] = useState(false);
  
    return (
      <>
        <button
          type="button"
          onClick={() => setShowing(!isShowing)}
          className="input-reset dim base-font bg-white button-reset f6 bn pn red"
        >
          <span className="pr2 ttu f6">
            <FormattedMessage {...messages.readMore} />
          </span>
          <ChevronDownIcon className="pt2" />
        </button>
        {isShowing && props.children}
      </>
    );
  };
  

/* USE COMMON EXPORTED COMPONENT NOT THIS IN FINAL VERSION */
const ProjectHeaderLine = props => {
    const userLink = (
      <Link to={`/users/${props.project.author}`} className="link blue-dark underline">
        {props.project.author}
      </Link>
    );
    return (
      <div className="cf">
        <div className="w-70 dib fl">
          <span className="blue-light">#{props.project.projectId}</span>
          <span className="blue-dark">
            {' '}
            | <FormattedMessage {...messages.createBy} values={{ user: userLink }} />
          </span>
        </div>
        <div className="mw4 dib fr">
          <PriorityBox priority={props.project.projectPriority} extraClasses={'pv2 ph3'} />
        </div>
      </div>
    );
  }

/* USE COMMON EXPORTED COMPONENT NOT THIS IN FINAL VERSION */
function MappingTypeIcon({ type }: Object) {
    const titledIcons = [
        { icon: RoadIcon, title: 'Roads', value: 'ROADS' },
        { icon: HomeIcon, title: 'Buildings', value: 'BUILDINGS' },
        { icon: WavesIcon, title: 'Waterways', value: 'WATERWAYS' },
        { icon: TaskIcon, title: 'Land use', value: 'LAND_USE' },
    ];
    const filteredIcon = titledIcons.filter(i => i.value === type);
    if (filteredIcon.length) {
        const SelectedIcon = filteredIcon[0];
        return <SelectedIcon.icon title={SelectedIcon.title} className="ml1 mr3" height="23" />;
    } else {
        return <></>;
    }
}

/* USE COMMON EXPORTED COMPONENT NOT THIS IN FINAL VERSION */
class TaskSelectionFooterProjDetailTemp extends React.Component {
    renderContributeButton() {
      if (this.props.type === 'detail') {
        return <Button className="white bg-red">
          <FormattedMessage {...messages.contribute}/>
        </Button>;
      }
      if (this.props.type === 'mapping') {
        return <Button className="white bg-red">
          <FormattedMessage {...messages.mapRandomTask}/>
        </Button>;
      }
      if (this.props.type === 'validation') {
        return <Button className="white bg-red">
          <FormattedMessage {...messages.validateRandomTask}/>
        </Button>;
      }
    }
    render() {
      const titleClasses = 'db ttu f6 blue-light mb2';
      return (
        <div className="cf">
          <div className="w-20 fl">
            <h3 className={titleClasses}>
              <FormattedMessage {...messages.typesOfMapping} />
            </h3>
            <div className="db fl pt1">
              {this.props.mappingTypes.map((item, n) => (
                <MappingTypeIcon key={n} type={item} />
              ))}
            </div>
          </div>
          <div className="w-20 fl">
            <h3 className={titleClasses}>
              <FormattedMessage {...messages.imagery} />
            </h3>
            {/* <Imagery value={this.props.imagery} /> */}
          </div>
          <div className="w-20 fl">
            <h3 className={titleClasses}>
              <FormattedMessage {...messages.editor} />
            </h3>
            <Dropdown
              options={getEditors()}
              value={this.props.defaultUserEditor || ''}
              display={<FormattedMessage {...messages.selectEditor} />}
            />
          </div>

        </div>
      );
    }
  }
  
  function ProjectDetailMap({ props }: Object) {
    return <div id="projectDetailMap"></div>;
  }

export const ProjectDetail = props => {
    const htmlDescription = props.project.projectInfo && htmlFromMarkdown(props.project.projectInfo.description)

    return (
        <div>
        <div className="bb b--grey-light">
          <div className="cf pv3">
            <div className="w-100 w-60-ns fl">
              <div className="ph4">
                <ReactPlaceholder
                  showLoadingAnimation={true}
                  rows={3}
                  delay={500}
                  ready={props.project.projectId}
                >
                  <ProjectHeaderLine {...props} />
                  <div className="cf pb3">
                    <h3 className="f2 fw6 mt2 mb3 ttu barlow-condensed blue-dark">
                      {props.project.projectInfo && props.project.projectInfo.name}
                    </h3>
                    <span className="blue-light">{props.project.campaignTag} &#183; Brazil</span>
                  </div>
                  <section>
                      {props.project.projectInfo && props.project.projectInfo.shortDescription}
                      <div className="pv2">
                          <ShowReadMoreButton>
                              <div className="pv2" 
                              dangerouslySetInnerHTML={htmlDescription}/> 
                          </ShowReadMoreButton>
                      </div>
                  </section>
                  <BigProjectOrgLogo organisationTag={props.project.organisationTag}/>
                  <div className="cf">
                    <div className="cf ttu barlow-condensed f4 pv2">
                      <span
                        className={`mr4 pb2 pointer `}
                      >
                        <FormattedMessage {...messages.tasks} />
                      </span>
                      <span
                        className={`mr4 pb2 pointer`}
                      >
                        <FormattedMessage {...messages.instructions} />
                      </span>
                    </div>
                  </div>
                </ReactPlaceholder>
              </div>
            </div>
            <div className="w-100 w-40-ns fl">
              <ProjectDetailMap tasks={{}} type={props.type} />
            </div>
          </div>
          <div className="cf ph4 bt bb b--grey-light">
            <ReactPlaceholder
              showLoadingAnimation={true}
              rows={3}
              delay={500}
              ready={props.project.projectId}
            >
                <TaskSelectionFooterProjDetailTemp
              type={props.type}
              mappingTypes={props.project.mappingTypes || []}
              imagery={props.project.imagery}
              editors={props.project.mappingEditors}
              defaultUserEditor={props.userPreferences.default_editor}
            />
                <BigProjectTeaser 
                  className={`pt4`}
                  totalContributors={props.project.totalContributors || 0} 
                  lastUpdated={props.project.lastUpdated} 
                  littleFont="f5"
                  bigFont="f4"
                  />
              <ProjectProgressBar
                className={`pb2`}
                percentMapped={props.project.percentMapped || 50}
                percentValidated={props.project.percentValidated || 25}
              />
              <div className="cf pt2 h2">
                <MappingLevelMessage level={props.project.mapperLevel} className="fl f5 mt1 ttc fw5 blue-grey" />
                <DueDateBox dueDate={props.project.dueDate} />
              </div>
              <DueDateBox  />
            </ReactPlaceholder>
            </div>

            {/* TODO ADD ANCHORS */}
            <div className="dib">
                Overview &#183; How to contribute &#183; Questions &amp; Comments &#183; Contributions &#183; Related Projects
            </div>
            <div className="dib pa3">
                <ShareIcon className="pt3 pr2" />
                <FormattedMessage {...messages.share} />
            </div>
            <div className="dib pa3">
                <FlagIcon className="pt3 pr2" />
                <FormattedMessage {...messages.addToFavorites} /> 
            </div>
                <div className="dib mt3">
                    <Button className="white bg-red">
                        <FormattedMessage {...messages.contribute}/>
                    </Button>
                {/* {this.renderContributeButton()} */}
                </div>
            </div>

            <h3 className="f2 fw6 mt2 mb3 ttu barlow-condensed blue-dar">How to Contribute</h3>
            <h3 className="f2 fw6 mt2 mb3 ttu barlow-condensed blue-dar">Contributors</h3>
            <h3 className="f2 fw6 mt2 mb3 ttu barlow-condensed blue-dar">Contributions Timeline</h3>
        </div>
      );


    // return (<><ProjectHeaderLine {...props} />
    //             <TaskSelectionFooterProjDetailTemp
    //           type={props.type}
    //           mappingTypes={props.project.mappingTypes}
    //           imagery={props.project.imagery}
    //           editors={props.project.mappingEditors}
    //           defaultUserEditor={props.userPreferences.default_editor}
    //         />
    //     </>
    //     );
}
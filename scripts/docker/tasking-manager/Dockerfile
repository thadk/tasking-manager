FROM python:3-buster

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# INSTALLATION

# Add repository for node
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -

# Install dependencies
RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get install -y nodejs libgeos-dev \
  && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Upgrade pip
RUN pip install --upgrade pip

# Get the Tasking Manager
ARG branch=develop
RUN git clone --depth=1 git://github.com/hotosm/tasking-manager.git \
	--branch $branch /usr/src/app

## SETUP
# Setup backend dependencies
RUN pip install --no-cache-dir -r requirements.txt


ADD https://gist.githubusercontent.com/thadk/3e44b06fbe3ec642d2a86b99174c37d1/raw/6fe1d1fde1dbbceb3054fac3ea7b287d4241ccc9/config-index.js /usr/src/app/frontend/src/config/index.js 
ADD https://gist.githubusercontent.com/thadk/3e44b06fbe3ec642d2a86b99174c37d1/raw/64bf4fde6bfcf2057cd54f3e572526bf0dbd1b51/config-index-test.js /usr/src/app/frontend/src/config/tests/config.test.js
# Setup and build frontend
RUN  cd frontend && npx yarn install && CI=true REACT_APP_BASE_URL='https://tasks-stage.hotosm.org' npx yarn test config  --env=jsdom  && REACT_APP_STACK=STAGING REACT_APP_BASE_URL='https://tasks-stage.hotosm.org' npx react-scripts build

# DEFINITIONS

EXPOSE 5000
CMD ["python", "manage.py", "runserver", "-h", "0.0.0.0"]

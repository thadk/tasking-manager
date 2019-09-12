import React from 'react';
import { connect } from 'react-redux';
import { Link } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import ReactPlaceholder from 'react-placeholder';

import messages from './messages';
import { getEditors } from '../../utils/editorsList';
import { PriorityBox } from '../projectcard/projectCard';
import { RoadIcon, HomeIcon, WavesIcon, TaskIcon } from '../svgIcons';
import { Dropdown } from '../dropdown';
import { Button } from '../button';
import { cancelablePromise } from '../../utils/promise';
import { fetchLocalJSONAPI } from '../../network/genericJSONRequest';

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

function Imagery({ value = '' }: Object) {
  let content = <span>{value}</span>;
  if (value.startsWith('tms[')) {
    content = <FormattedMessage {...messages.customTMSLayer} />;
  }
  if (value.startsWith('wms[')) {
    content = <FormattedMessage {...messages.customWMSLayer} />;
  }
  if (value.startsWith('wmts[')) {
    content = <FormattedMessage {...messages.customWMTSLayer} />;
  }
  return <p className="blue-dark f5 fw6 pt1 ma0">{content}</p>;
}

class TaskSelectionFooter extends React.Component {
  renderContributeButton() {
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
        <div className="w-40 fl tr">
          <div className="mt3">
            {this.renderContributeButton()}
          </div>
        </div>
      </div>
    );
  }
}

function TaskSelectionMap({ props }: Object) {
  return <div id="taskSelectionMap"></div>;
}

class TaskSelection extends React.Component {
  getProjectTasksPromise;
  state = {
    activeSection: 'tasks',
    tasks: {},
  };

  componentDidMount() {
    this.getProjectTasks();
  }
  getProjectTasks = event => {
    this.getProjectTasksPromise = cancelablePromise(
      fetchLocalJSONAPI(`projects/${this.props.project.projectId}/tasks/`)
    );
    this.getProjectTasksPromise.promise
      .then(data => this.setState({tasks: data}))
      .catch(e => console.log(e));
  }
  renderHeaderLine() {
    const userLink = (
      <Link to={`/users/${this.props.project.author}`} className="link blue-dark underline">
        {this.props.project.author}
      </Link>
    );
    return (
      <div className="cf">
        <div className="w-70 dib fl">
          <span className="blue-light">#{this.props.project.projectId}</span>
          <span className="blue-dark">
            {' '}
            | <FormattedMessage {...messages.createBy} values={{ user: userLink }} />
          </span>
        </div>
        <div className="mw4 dib fr">
          <PriorityBox priority={this.props.project.projectPriority} extraClasses={'pv2 ph3'} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="cf pv3">
          <div className="w-100 w-60-ns fl">
            <div className="ph4">
              <ReactPlaceholder
                showLoadingAnimation={true}
                rows={3}
                delay={500}
                ready={this.props.project.projectId}
              >
                {this.renderHeaderLine()}
                <div className="cf pb3">
                  <h3 className="f2 fw6 mt2 mb3 ttu barlow-condensed blue-dark">
                    {this.props.project.projectInfo && this.props.project.projectInfo.name}
                  </h3>
                  <span className="blue-light">{this.props.project.campaignTag} &#183; Brazil</span>
                </div>
                <div className="cf">
                  <div className="cf ttu barlow-condensed f4 pv2">
                    <span
                      className={`mr4 pb2 pointer ${this.state.activeSection === 'tasks' && 'bb b--blue-dark'}`}
                      onClick={() => this.setState({activeSection: 'tasks'})}
                    >
                      <FormattedMessage {...messages.tasks} />
                    </span>
                    <span
                      className={`mr4 pb2 pointer ${this.state.activeSection === 'instructions' && 'bb b--blue-dark'}`}
                      onClick={() => this.setState({activeSection: 'instructions'})}
                    >
                      <FormattedMessage {...messages.instructions} />
                    </span>
                  </div>
                </div>
              </ReactPlaceholder>
            </div>
          </div>
          <div className="w-100 w-40-ns fl">
            <TaskSelectionMap tasks={this.state.tasks} type={this.props.type} />
          </div>
        </div>
        <div className="cf ph4 bt b--grey-light">
          <ReactPlaceholder
            showLoadingAnimation={true}
            rows={3}
            delay={500}
            ready={this.props.project.projectId}
          >
            <TaskSelectionFooter
              type={this.props.type}
              mappingTypes={this.props.project.mappingTypes}
              imagery={this.props.project.imagery}
              editors={this.props.project.mappingEditors}
              defaultUserEditor={this.props.userPreferences.default_editor}
            />
          </ReactPlaceholder>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userPreferences: state.preferences,
  username: state.auth.getIn(['userDetails', 'username']),
});

TaskSelection = connect(
  mapStateToProps
)(TaskSelection);
export { TaskSelection, MappingTypeIcon, Imagery, TaskSelectionFooter };

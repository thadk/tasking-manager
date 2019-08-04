// src/components/Task.stories.js

import React from 'react';
import { storiesOf } from '@storybook/react';
import WebFont from 'webfontloader';
import { action } from '@storybook/addon-actions';
import '../../assets/styles/index.scss';
import { FeaturedProjects } from '../../components/homepage/featuredProjects';


WebFont.load({
  google: {
    families: [
      'Barlow Condensed:400,600,700', 'Archivo:400,500,600,700', 'sans-serif'
    ]
  }
});


const cards = [
  {
    projectId: 6106,
    projectStatus: "PUBLISHED",
    projectPriority: "URGENT",
    mapperLevel: "BEGINNER",
    title: "Response to the impact of Cyclone Idai in Mozambique",
    shortDescription: "Disaster Response · Cyclone Idai · Mozambique",
    created: new Date("2019-04-23T14:49:23.809743"),
    lastUpdated: new Date("2019-07-17T18:50:28.081458"),
    "campaignTag": "#UNICEF",
    "organisationTag": "UNICEF",
    "percentMapped": 100,
    "percentValidated": 96,
    "percentBadImagery": 1,
    "totalMappers": 10,
    "totalTasks": 152,
    "totalComments": 0,
    "totalMappingTime": 80214,
    "totalValidationTime": 458741,
    "totalTimeSpent": 538955,
    "averageMappingTime": 8912.666666666666,
    "averageValidationTime": 114685.25,
    "status": "PUBLISHED"
  },
  {
      projectId: 5001,
      projectStatus: "PUBLISHED",
      projectPriority: "MEDIUM",
      mapperLevel: "ADVANCED",
      title: "Prepare for the influx of Venezuelan refugees into Colombia",
      shortDescription: "Refugee Response · AyudaVenezuela · Colombia",
      created: new Date("2019-04-23T14:49:23.809743"),
      dueDate: new Date("2019-09-17T18:50:28.081458"),
      lastUpdated: new Date("2019-07-17T18:50:28.081458"),
      "campaignTag": "American Red Cross",
      "organisationTag": "American Red Cross",
      "percentMapped": 50,
      "percentValidated": 30,
      "percentBadImagery": 1,
      "totalMappers": 20,
      "totalTasks": 152,
      "totalComments": 0,
      "totalMappingTime": 80214,
      "totalValidationTime": 458741,
      "totalTimeSpent": 538955,
      "averageMappingTime": 8912.666666666666,
      "averageValidationTime": 114685.25,
      "status": "PUBLISHED"
    },
    {
      projectId: 5707,
      projectStatus: "PUBLISHED",
      projectPriority: "MEDIUM",
      mapperLevel: "INTERMEDIATE",
      title: "Tracing borderlands to contain Ebola outbreak",
      shortDescription: "Public Health · Ebola · DRC",
      created: new Date("2019-04-23T14:49:23.809743"),
      lastUpdated: new Date("2019-07-17T18:50:28.081458"),
      dueDate: new Date("2019-07-25T18:50:28.081458"),
      "campaignTag": "#Allpeopleonmap",
      "organisationTag": "Médecins Sans Frontières",
      "percentMapped": 66,
      "percentValidated": 50,
      "percentBadImagery": 1,
      "totalMappers": 2,
      "totalTasks": 152,
      "totalComments": 0,
      "totalMappingTime": 80214,
      "totalValidationTime": 458741,
      "totalTimeSpent": 538955,
      "averageMappingTime": 8912.666666666666,
      "averageValidationTime": 114685.25,
      "status": "PUBLISHED"
    },
    {
      projectId: 6106,
      projectStatus: "PUBLISHED",
      projectPriority: "LOW",
      mapperLevel: "INTERMEDIATE",
      title: "Mapping mosquito net coverage",
      shortDescription: "Public Health · Malaria2018 · Mozambique",
      dueDate: new Date("2019-07-10T18:50:28.081458"),
      created: new Date("2019-04-23T14:49:23.809743"),
      lastUpdated: new Date("2019-07-17T18:50:28.081458"),
      "campaignTag": "#Allpeopleonmap",
      "organisationTag": "#YouthMappers",
      "percentMapped": 70,
      "percentValidated": 20,
      "percentBadImagery": 1,
      "totalMappers": 50,
      "totalTasks": 152,
      "totalComments": 0,
      "totalMappingTime": 80214,
      "totalValidationTime": 458741,
      "totalTimeSpent": 538955,
      "averageMappingTime": 8912.666666666666,
      "averageValidationTime": 114685.25,
      "status": "PUBLISHED"
    },
      {
        projectId: 6106,
        projectStatus: "PUBLISHED",
        projectPriority: "LOW",
        mapperLevel: "INTERMEDIATE",
        title: "Mapping mosquito net coverage",
        shortDescription: "Public Health · Malaria2018 · Mozambique",
        created: new Date("2019-04-23T14:49:23.809743"),
        lastUpdated: new Date("2019-07-17T18:50:28.081458"),
        "campaignTag": "#Allpeopleonmap",
        "organisationTag": "#YouthMappers",
        "percentMapped": 70,
        "percentValidated": 20,
        "percentBadImagery": 1,
        "totalMappers": 50,
        "totalTasks": 152,
        "totalComments": 0,
        "totalMappingTime": 80214,
        "totalValidationTime": 458741,
        "totalTimeSpent": 538955,
        "averageMappingTime": 8912.666666666666,
        "averageValidationTime": 114685.25,
        "status": "PUBLISHED"
      },
    {
      projectId: 6106,
      projectStatus: "PUBLISHED",
      projectPriority: "LOW",
      mapperLevel: "INTERMEDIATE",
      title: "Mapping mosquito net coverage",
      shortDescription: "Public Health · Malaria2018 · Mozambique",
      created: new Date("2019-04-23T14:49:23.809743"),
      lastUpdated: new Date("2019-07-17T18:50:28.081458"),
      "campaignTag": "#Allpeopleonmap",
      "organisationTag": "#YouthMappers",
      "percentMapped": 70,
      "percentValidated": 20,
      "percentBadImagery": 1,
      "totalMappers": 50,
      "totalTasks": 152,
      "totalComments": 0,
      "totalMappingTime": 80214,
      "totalValidationTime": 458741,
      "totalTimeSpent": 538955,
      "averageMappingTime": 8912.666666666666,
      "averageValidationTime": 114685.25,
      "status": "PUBLISHED"
    }];

export const actions = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

storiesOf('FeaturedProjects', module)
  .add('default', () => <FeaturedProjects/>)
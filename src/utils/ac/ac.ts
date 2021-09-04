import {AccessControl} from 'accesscontrol';

const grantsObject = {
  admin: {
    user: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    audit: {
      'read:any': ['*'],
    },
  },
  member: {
    list: {
      'create:own': ['*'],
      'read:own': ['*'],
      'update:own': ['*'],
      'delete:own': ['*'],
    },
    subtask: {
      'create:own': ['*'],
      'read:own': ['*'],
      'update:own': ['*'],
      'delete:own': ['*'],
    },
    user: {
      'read:own': ['*'],
      'update:own': ['*'],
      'delete:own': ['*'],
    },
    settings: {
      'read:own': ['*'],
      'update:own': ['*'],
    },
  },
};

const ac = new AccessControl(grantsObject);

export default ac;

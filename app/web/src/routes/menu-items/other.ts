// assets
import { IconHelp, IconStar } from '@tabler/icons-react';
import { CheckCircle } from '@mui/icons-material';
// constant
const icons = { IconHelp, IconStar };

// ==============================|| HR PAGE & MENU ITEMS ||============================== //

const other = {
  id: 'Hr',
  title: 'Recruitment',

  type: 'group',
  roles: ['Ceo'],

  children: [
    {
      id: 'sample-page',
      title: 'Shortlisted',
      type: 'item',
      url: '/devs/shortlisted',
      icon: icons.IconStar,
      // breadcrumbs: false,
    },
    {
      id: 'clockify',
      title: 'Clockify',
      type: 'item',
      icon: icons.IconHelp,
      url: '/devs/clockify',
    },
  ],
};

export default other;

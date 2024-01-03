import { IClient } from '../../types/client';

export const clientData = [
  {
    firstName: 'Nola',
    avatar: 'Parker',
    companyName: 'Smith - Smith',
    email: 'Kade_Howe@hotmail.com',
    lastName: 'Weber',
    phoneNumber: '318.333.4249 x70072',
    projectTitle: 'benchmark frictionless schemas',
    startDate: 'Sun Dec 11 2022 06:46:11 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Irma',
    avatar: 'Torphy',
    companyName: 'Larkin, Heller and Weimann',
    email: 'Orville.Lakin12@hotmail.com',
    lastName: 'Kunde',
    phoneNumber: '1-890-434-1876',
    projectTitle: 'syndicate clicks-and-mortar relationships',
    startDate: 'Sat Aug 05 2023 10:27:51 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Michael',
    avatar: 'Stokes',
    companyName: 'Marquardt LLC',
    email: 'Odell27@hotmail.com',
    lastName: 'Steuber',
    phoneNumber: '908-862-9269',
    projectTitle: 'unleash strategic metrics',
    startDate: 'Wed May 17 2023 04:05:36 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Joany',
    avatar: 'Kuvalis',
    companyName: 'Zieme - Rempel',
    email: 'Micah.Keebler@gmail.com',
    lastName: 'Upton',
    phoneNumber: '(248) 632-4127',
    projectTitle: 'disintermediate out-of-the-box supply-chains',
    startDate: 'Fri Jan 06 2023 10:02:07 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Reina',
    avatar: 'Langosh',
    companyName: 'Ritchie, VonRueden and Grant',
    email: 'Nathanael.Gleichner58@gmail.com',
    lastName: 'Parisian',
    phoneNumber: '230.955.3971 x5097',
    projectTitle: 'redefine 24/365 e-commerce',
    startDate: 'Fri Jun 16 2023 07:07:26 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Vincent',
    avatar: 'Hintz',
    companyName: 'Bartell - Streich',
    email: 'Sheldon.Klocko87@hotmail.com',
    lastName: 'Boehm',
    phoneNumber: '(251) 206-8963 x226',
    projectTitle: 'morph global networks',
    startDate: 'Sat Apr 15 2023 11:19:57 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Giovanna',
    avatar: 'Bogisich',
    companyName: 'Bergnaum, Gaylord and Roob',
    email: 'Sadie_Rau17@gmail.com',
    lastName: 'Mraz',
    phoneNumber: '271.602.2153 x75620',
    projectTitle: 'enable user-centric mindshare',
    startDate: 'Sat Feb 04 2023 19:41:00 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Queen',
    avatar: 'Morissette',
    companyName: 'Rodriguez - Corwin',
    email: 'Sadye26@gmail.com',
    lastName: 'Murray',
    phoneNumber: '230-816-1620 x363',
    projectTitle: 'productize real-time e-services',
    startDate: 'Sat Sep 09 2023 16:18:09 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Rossie',
    avatar: 'Toy',
    companyName: 'Funk - Kovacek',
    email: 'Mollie39@gmail.com',
    lastName: 'Quigley',
    phoneNumber: '(637) 758-4428 x9575',
    projectTitle: 'incentivize distributed synergies',
    startDate: 'Sun Apr 23 2023 16:10:28 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Abbey',
    avatar: 'Haley',
    companyName: 'Hegmann, Tremblay and Skiles',
    email: 'Hector.Tillman@yahoo.com',
    lastName: 'Goldner',
    phoneNumber: '900.236.1379 x42943',
    projectTitle: 'empower end-to-end convergence',
    startDate: 'Wed Aug 09 2023 06:57:35 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Elbert',
    avatar: 'Kuhic',
    companyName: 'Ruecker LLC',
    email: 'Vida_Flatley0@hotmail.com',
    lastName: 'Lebsack',
    phoneNumber: '273-953-6311',
    projectTitle: 'transform interactive web services',
    startDate: 'Tue May 30 2023 23:32:04 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Jose',
    avatar: 'Marvin',
    companyName: 'Kreiger and Sons',
    email: 'Stevie_Schowalter@hotmail.com',
    lastName: 'Gleichner',
    phoneNumber: '634-853-5228 x33857',
    projectTitle: 'enhance ubiquitous partnerships',
    startDate: 'Fri Jan 13 2023 06:43:33 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Kathleen',
    avatar: 'Thiel',
    companyName: 'Fay - Doyle',
    email: 'Stella.Goyette64@hotmail.com',
    lastName: 'Schaefer',
    phoneNumber: '406.560.0559 x458',
    projectTitle: 'recontextualize end-to-end initiatives',
    startDate: 'Sat Jun 10 2023 13:51:30 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Romaine',
    avatar: 'Paucek',
    companyName: 'Medhurst, Brekke and Williamson',
    email: 'Isaac.Johnson52@yahoo.com',
    lastName: 'West',
    phoneNumber: '(235) 626-0493 x316',
    projectTitle: 'drive e-business deliverables',
    startDate: 'Fri Oct 20 2023 08:26:56 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Gage',
    avatar: 'Kiehn',
    companyName: 'Wolf - Hyatt',
    email: 'Mateo3@gmail.com',
    lastName: 'Kilback',
    phoneNumber: '(832) 284-1650 x386',
    projectTitle: 'integrate visionary methodologies',
    startDate: 'Wed Nov 08 2023 21:52:48 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Mae',
    avatar: 'Price',
    companyName: 'Lang - Simonis',
    email: 'Brenden_Nader@yahoo.com',
    lastName: 'Shields',
    phoneNumber: '673-342-7477',
    projectTitle: 'revolutionize integrated niches',
    startDate: 'Fri May 26 2023 13:04:31 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Domenick',
    avatar: 'Kshlerin',
    companyName: 'Hudson Inc',
    email: 'Berry.Mohr@hotmail.com',
    lastName: 'Morar',
    phoneNumber: '630.862.6699',
    projectTitle: 'empower open-source portals',
    startDate: 'Tue Apr 25 2023 15:00:34 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Corrine',
    avatar: 'Christiansen',
    companyName: 'Wuckert - Block',
    email: 'Sigmund_Ritchie@gmail.com',
    lastName: 'Huel',
    phoneNumber: '(702) 777-7143',
    projectTitle: 'benchmark global systems',
    startDate: 'Mon Feb 06 2023 16:11:52 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Ramon',
    avatar: 'Marquardt',
    companyName: 'Bode - Kassulke',
    email: 'Larry.Smitham@gmail.com',
    lastName: 'Schuppe',
    phoneNumber: '1-489-339-2524',
    projectTitle: 'synergize revolutionary niches',
    startDate: 'Sun Jul 30 2023 19:27:19 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Audie',
    avatar: 'Gislason',
    companyName: 'Wiza, Lesch and Davis',
    email: 'Clifford.Berge69@yahoo.com',
    lastName: 'Russel',
    phoneNumber: '685.591.8752 x96362',
    projectTitle: 'brand back-end mindshare',
    startDate: 'Thu Jul 13 2023 05:39:37 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Austyn',
    avatar: 'Howe',
    companyName: 'Gibson - Reynolds',
    email: 'Clement_Streich@gmail.com',
    lastName: 'Kreiger',
    phoneNumber: '1-633-529-5326',
    projectTitle: 'synergize innovative e-services',
    startDate: 'Wed Oct 11 2023 07:29:45 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Dedric',
    avatar: 'Gutkowski',
    companyName: 'Kohler, Larson and Prosacco',
    email: 'Lelah.Gottlieb@yahoo.com',
    lastName: 'Ryan',
    phoneNumber: '283-928-6634 x93202',
    projectTitle: 'orchestrate mission-critical deliverables',
    startDate: 'Sun May 14 2023 05:46:43 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
  {
    firstName: 'Ralph',
    avatar: 'Leannon',
    companyName: 'Miller and Sons',
    email: 'Zena.Daugherty@hotmail.com',
    lastName: 'Walsh',
    phoneNumber: '300-602-0156 x193',
    projectTitle: 'deliver plug-and-play infrastructures',
    startDate: 'Sat Aug 19 2023 02:00:13 GMT+0000 (Greenwich Mean Time)',
    // active:''
  },
];

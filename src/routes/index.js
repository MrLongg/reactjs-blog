import config from '~/config';

// Pages
import Home from '~/pages/Home';
import About from '~/pages/About';
import Contact from '~/pages/Contact';
import Write from '~/pages/Write';

// Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.about, component: About },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.write, component: Write },
];

export { publicRoutes };

/* global, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { DataModels } from './index.constants';
import { AuthController } from './auth/auth.controller';
import { CompareToDirective } from './directives/compareTo.directive';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import helpmeHome from './components/home';
import helpmeProfile from './components/profile';
import helpmeHelpRequest from './components/help-request';
import helpmeUsersHelpRequestList from './components/users-help-request-list';
import helpmeUserHelpRequestList from './components/user-help-request-list';
import helpmeComment from './components/comment';
import helpmeFooter from './components/footer';

angular.module('helpFront', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ui.router',
    'ui.bootstrap',
    'toastr',
    'satellizer',
    helpmeHome,
    helpmeProfile,
    helpmeHelpRequest,
    helpmeUsersHelpRequestList,
    helpmeUserHelpRequestList,
    helpmeComment,
    helpmeFooter
  ])
  .constant('API_URL', 'http://localhost:5000/')
  .constant('moment', moment)
  .constant('DataModels', DataModels)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('AuthController', AuthController)
  .directive('navbar', NavbarDirective)
  .directive('compareTo', CompareToDirective);

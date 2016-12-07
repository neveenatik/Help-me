import { helpmeProfile } from './profile.component';

import { NavbarDirective } from './navbar.directive';

export default angular.module('helpme.profile', [])
	.component('helpmeProfile', helpmeProfile)
	.name;

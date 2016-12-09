import { helpmeProfile } from './profile.component';
import { helpmeComment } from '../comment/comment.component';

export default angular.module('helpme.profile', [])
	.component('helpmeProfile', helpmeProfile)
	.component('helpmeComment', helpmeComment)
	.name;

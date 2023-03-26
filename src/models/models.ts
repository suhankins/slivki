import { getModelForClass } from '@typegoose/typegoose';
import { UserClass } from './User';

export const UserModel = getModelForClass(UserClass);

import tokenType from "./tokenType";

export default interface localToken{
	id:string,
	type:tokenType,
	admin: boolean,
	username?:string,
}
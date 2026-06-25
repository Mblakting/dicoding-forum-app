import LoginInput from './LoginInput';

export default { title: 'Components/LoginInput', component: LoginInput };
export const Default = { args: { login: (data) => alert(`Login ditekan: ${JSON.stringify(data)}`) } };

import RegisterInput from './RegisterInput';

export default { title: 'Components/RegisterInput', component: RegisterInput };
export const Default = { args: { register: (data) => alert(`Register ditekan: ${JSON.stringify(data)}`) } };

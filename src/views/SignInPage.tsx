import {defineComponent, PropType, reactive} from 'vue';
import {Form, FormItem} from '../shared/Form';
import {MainLayout} from '../layouts/MainLayout';
import {validate} from '../shared/validate';
import {Icon} from '../shared/Icon';
import s from '../stylesheets/SignInPage.module.scss';
import {Button} from '../shared/Button';

export const SignInPage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: '',
      code: ''
    });
    const errors = reactive({
      email: [],
      code: []
    });
    const onSubmit = (e: Event) => {
      e.preventDefault();
      Object.assign(errors, {
        email: [], code: []
      });
      Object.assign(errors, validate(formData, [
        {key: 'email', type: 'required', message: '必填'},
        {key: 'email', type: 'pattern', regex: /.+@.+/, message: '必须是邮箱地址'},
        {key: 'code', type: 'required', message: '必填'},
      ]));
    };
    const onClickSendValidationCode = () => {
      console.log('aaa');
    };
    return () => (
      <MainLayout>{
        {
          title: () => '登录',
          icon: () => <Icon name="return"/>,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="tree"/>
                <h1 class={s.appName}>森林记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem label="邮箱地址" type="text"
                          placeholder="请输入邮箱，然后点击发送验证码"
                          v-model={formData.email} error={errors.email?.[0]}/>
                <FormItem label="验证码" type="validationCode"
                          placeholder="请输入六位数字"
                          onClick={onClickSendValidationCode}
                          v-model={formData.code} error={errors.code?.[0]}/>
                <FormItem style={{paddingTop: '96px'}}>
                  <Button>登录</Button>
                </FormItem>
              </Form>
            </div>
          )
        }
      }</MainLayout>
    );
  }
});

import {defineComponent, PropType, reactive, ref} from 'vue';
import {Form, FormItem} from '../shared/Form';
import {MainLayout} from '../layouts/MainLayout';
import {validate} from '../shared/validate';
import {Icon} from '../shared/Icon';
import s from '../stylesheets/SignInPage.module.scss';
import {Button} from '../shared/Button';
import axios from 'axios';
import {http} from '../shared/Http';

export const SignInPage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: 'lemon19961007@sina.com',
      code: ''
    });
    const errors = reactive({
      email: [],
      code: []
    });
    const refValidationCode = ref<any>();
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
    // 错误数据处理，422 => 邮箱格式不正确
    const onError = (error: any) => {
      if (error.response && error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
      throw error;
    };
    const onClickSendValidationCode = async () => {
      const response = await http
        .post('/validation_codes', {email: formData.email})
        .catch(onError); // 失败，具体业务error写(拦截)在这里
      // 成功,refValidationCode.value传给startCount，从而触发倒计时
      refValidationCode.value.startCount();
      console.log(response);
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
                <FormItem ref={refValidationCode}
                          label="验证码" type="validationCode"
                          placeholder="请输入六位数字"
                  // test countFrom 1s可以发送一次验证码
                          countFrom={1}
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

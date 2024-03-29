import {defineComponent, reactive, ref} from 'vue';
import {Form, FormItem} from '../shared/Form';
import {MainLayout} from '../layouts/MainLayout';
import {hasError, validate} from '../shared/validate';
import {Icon} from '../shared/Icon';
import s from '../stylesheets/SignInPage.module.scss';
import {Button} from '../shared/Button';
import {http} from '../shared/Http';
import {useBool} from '../hooks/useBool';
import {useRoute, useRouter} from 'vue-router';
import {useMeStore} from '../stores/useMeStore';
import {BackIcon} from '../shared/BackIcon';

export const SignInPage = defineComponent({
  setup: (props, context) => {
    const meStore = useMeStore();
    const formData = reactive({
      email: 'sariel107@sina.com',
      code: '123456'
    });
    const errors = reactive({
      email: [],
      code: []
    });
    const refValidationCode = ref<any>();
    const {ref: refDisabled, toggle, on: disabled, off: enabled} = useBool(false);
    const router = useRouter();
    const route = useRoute();

    // 登录提交信息
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      Object.assign(errors, {
        email: [], code: []
      });
      Object.assign(errors, validate(formData, [
        {key: 'email', type: 'required', message: '必填'},
        {key: 'email', type: 'pattern', regex: /.+@.+/, message: '必须是邮箱地址'},
        {key: 'code', type: 'required', message: '必填'},
      ]));
      if (!hasError(errors)) {
        const response = await http.post<{ jwt: string }>('/session', formData
          // { _mock测试使用的虚假数据 params: {_mock: 'session'}}
        ).catch(onError);
        localStorage.setItem('jwt', response.data.jwt);
        // 通过 localStorage 保存获取登录前的页面
        // const returnTo = localStorage.getItem('returnTo');
        // 通过 query 查询参数保存获取登录前的页面
        // router.push('/sign_in?return_to=' + encodeURIComponent(route.fullPath));
        const returnTo = route.query.return_to?.toString();
        meStore.refreshMe();
        router.push(returnTo || '/');
      }
    };

    // post请求错误处理
    // 验证码和登录错误数据处理，422 => 邮箱格式不正确
    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
      throw error;
    };

    // 验证码获取
    const onClickSendValidationCode = async () => {
      disabled();
      // .catch 失败，具体业务error写(拦截)在这里
      await http
        .post('/validation_codes', {email: formData.email}, {_autoLoading: true})
        .catch(onError)
        .finally(enabled);
      // 成功,refValidationCode.value传给startCount，从而触发倒计时
      refValidationCode.value.startCount();
    };
    return () => (
      <MainLayout>{
        {
          icon: () => <BackIcon/>,
          title: () => <div>登录</div>,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="tree"/>
                <h1 class={s.appName}>森林记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <span class={s.testEmail}>(测试账号，可一键登录)</span>
                <FormItem label="邮箱地址" type="text"
                          placeholder="请输入邮箱，然后点击发送验证码"
                          v-model={formData.email} error={errors.email?.[0]}/>
                <FormItem ref={refValidationCode}
                          label="验证码" type="validationCode"
                          placeholder="请输入六位数字"
                  // test countFrom 60s可以发送一次验证码
                          countFrom={60}
                          onClick={onClickSendValidationCode}
                          disabled={refDisabled.value}
                          v-model={formData.code} error={errors.code?.[0]}/>
                <FormItem style={{paddingTop: '96px'}}>
                  <Button type="submit">登录</Button>
                </FormItem>
              </Form>
            </div>
          )
        }
      }</MainLayout>
    );
  }
});

export default SignInPage;

import {defineComponent, onMounted, PropType, reactive} from 'vue';
import s from '../../stylesheets/tag/Tag.module.scss';
import {Button} from '../../shared/Button';
import {hasError, Rules, validate} from '../../shared/validate';
import {Form, FormItem} from '../../shared/Form';
import {useRoute, useRouter} from 'vue-router';
import {http} from '../../shared/Http';
import {Resource, Tag} from '../../env';
import {onFormError} from '../../shared/onFormError';

export const TagForm = defineComponent({
  props: {
    id: Number
  },
  setup: (props, context) => {
    const route = useRoute();
    const router = useRouter();
    if (!route.query.kind) {
      return () => <div>参数错误</div>;
    }
    const formData = reactive<Partial<Tag>>({
      id: undefined,
      name: '',
      sign: '',
      kind: route.query.kind!.toString(),
    });
    // 校验规则
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      const rules: Rules<typeof formData> = [
        {key: 'name', type: 'required', message: '必填'},
        {key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符'},
        {key: 'sign', type: 'required', message: '必填'},
      ];
      Object.assign(errors, {
        name: [],
        sign: []
      });
      Object.assign(errors, validate(formData, rules));
      if (!hasError(errors)) {
        const promise = await formData.id ?
          http.patch(`/tags/${formData.id}`, formData, {
            params: {_mock: 'tagEdit'},
            _autoLoading: true
          }) :
          http.post('/tags', formData, {
            params: {_mock: 'tagCreate'},
            _autoLoading: true
          });
        await promise.catch((error) =>
          onFormError(error, (data) => Object.assign(errors, data.errors))
        );
        router.back();
      }
    };
    onMounted(async () => {
      if (!props.id) { return; }
      const response = await http.get<Resource<Tag>>(`/tags/${props.id}`, {
        _mock: 'tagShow',
      });
      Object.assign(formData, response.data.resource);
    });
    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem label="标签名"
                  type="text"
                  v-model={formData.name}
                  error={errors['name']?.[0]}/>
        <FormItem label={'符号 ' + formData.sign}
                  type="emojiSelect" v-model={formData.sign}
                  error={errors['sign']?.[0]}/>
        <FormItem>
          <Button type="submit" class={[s.button]}>确定</Button>
        </FormItem>
      </Form>
    );
  }
});

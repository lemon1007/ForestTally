import {defineComponent, PropType, reactive, toRaw} from 'vue';
import {MainLayout} from '../../layouts/MainLayout';
import {Button} from '../../shared/Button';
import {Icon} from '../../shared/Icon';
import s from '../../stylesheets/tag/TagCreate.module.scss';
import {EmojiSelect} from '../../shared/EmojiSelect ';

export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: 'x',
    });
    // 校验规则
    const onSubmit = (e: Event) => {
      console.log(toRaw(formData));
      // const rules = [
      //   // 每一条对应一条校验规则，依次检查
      //   {key: 'name', required: true, message: '必填'},
      //   {key: 'name', pattern: /^.{1,4}$/, message: '只允许填1-4个字符'},
      //   {key: 'sign', required: true},
      // ];
      // const errors = validate(formData, rules);

      e.preventDefault();
    };
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <Icon name="return" onClick={() => { }}/>,
        default: () => (
          <form class={s.form} onSubmit={onSubmit}>
            <div class={[s.formRow, s.header_label_name]}>
              <label class={s.formLabel}>
                <span class={s.formItem_name}>标签名</span>
                <div class={s.formItem_value}>
                  <input v-model={formData.name} class={[s.formItem, s.input, s.error]}></input>
                </div>
                <div class={s.formItem_errorHint}>
                  {/*<span>{errors['name'].join(',')}</span>*/}
                </div>
              </label>
            </div>
            <div class={s.formRow}>
              <label class={s.formLabelEmoji}>
                <div class={s.formItem_name_wrapper}>
                  <span class={s.formItem_name}>符号</span>
                  <span class={s.formItem_name_icon}>{formData.sign}</span>
                </div>
                <div class={s.formItem_value}>
                  <EmojiSelect v-model={formData.sign} class={[s.formItem, s.emojiList, s.error]}/>
                </div>
                <div class={s.formItem_errorHint}>
                  <span>必填</span>
                </div>
              </label>
            </div>
            <p class={s.tips}>记账时长按标签即可进行编辑</p>
            <div class={s.formRow}>
              <div class={s.formItem_value}>
                <Button class={[s.formItem, s.button]}>确定</Button>
              </div>
            </div>
          </form>
        )
      }}</MainLayout>
    );
  }
});
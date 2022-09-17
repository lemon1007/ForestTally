import {defineComponent, PropType} from 'vue';
import s from '../../stylesheets/item/InputPad.module.scss';
import {Icon} from '../../shared/Icon';

export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const buttons = [
      {text: '1', onClick: () => {}},
      {text: '2', onClick: () => {}},
      {text: '3', onClick: () => {}},
      {text: '清空', onClick: () => {}},
      {text: '4', onClick: () => {}},
      {text: '5', onClick: () => {}},
      {text: '6', onClick: () => {}},
      {text: '+', onClick: () => {}},
      {text: '7', onClick: () => {}},
      {text: '8', onClick: () => {}},
      {text: '9', onClick: () => {}},
      {text: '-', onClick: () => {}},
      {text: '.', onClick: () => {}},
      {text: '0', onClick: () => {}},
      {text: '回删', onClick: () => {}},
      {text: '提交', onClick: () => {}},
    ];
    return () => (<>
        <div class={s.showInfo}>
          <span class={s.createdAt}>
            <Icon name="test" class={s.date_icon}></Icon>
            <span class={s.date}>2022-09-17</span>
          </span>
          <span class={s.amount}>123456789</span>
        </div>
          <div class={s.notes}>
            <Icon name="test" class={s.notes_icon}></Icon>
            <input placeholder="备注"></input>
          </div>

        <div class={s.buttons}>
          {buttons.map(button =>
            <button onClick={button.onClick}>{button.text}</button>)
          }
        </div>
      </>
    );
  }
});

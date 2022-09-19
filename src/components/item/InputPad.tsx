import {defineComponent, PropType, reactive, ref} from 'vue';
import s from '../../stylesheets/item/InputPad.module.scss';
import {Icon} from '../../shared/Icon';
import {DatetimePicker, Popup} from 'vant';
import {Time} from '../../shared/time';

export const InputPad = defineComponent({
  props: {
    happenAt: String,
    amount: Number,
    onSubmit: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props, context) => {
    const appendText = (n: number | string) => {
      const nString = n.toString();
      const dotIndex = refAmount.value.toString().indexOf('.');
      if (refAmount.value.toString().length >= 13) {
        return;
      }
      if (dotIndex >= 0 && refAmount.value.toString().length - dotIndex > 2) {
        return;
      }
      if (nString === '.') {
        if (dotIndex >= 0) { // 已经有小数点了
          return;
        }
      } else if (nString === '0') {
        if (dotIndex === -1) { // 没有小数点
          if (refAmount.value === '0') { // 没小数点，但是有0
            return;
          }
        }
      } else {
        if (refAmount.value === '0') {
          refAmount.value = '';
        }
      }
      refAmount.value += n.toString();
    };
    const buttons = [
      {text: '1', onClick: () => {appendText(1);}},
      {text: '2', onClick: () => {appendText(2);}},
      {text: '3', onClick: () => {appendText(3);}},
      {text: '清空', onClick: () => { refAmount.value = '0';}},
      {text: '4', onClick: () => {appendText(4);}},
      {text: '5', onClick: () => {appendText(5);}},
      {text: '6', onClick: () => {appendText(6);}},
      {text: '', onClick: () => {}},
      {text: '7', onClick: () => {appendText(7);}},
      {text: '8', onClick: () => {appendText(8);}},
      {text: '9', onClick: () => {appendText(9);}},
      {text: '', onClick: () => {}},
      {text: '0', onClick: () => {appendText(0);}},
      {text: '.', onClick: () => {appendText('.');}},
      {
        text: '回删', onClick: () => {
          if (refAmount.value.toString().length === 1) {
            refAmount.value = '0';
          } else {
            refAmount.value = refAmount.value.toString().slice(0, -1);
          }
        }
      },
      {
        text: '提交', onClick: () => {
          context.emit('update:amount', parseFloat(refAmount.value));
          props.onSubmit?.();
          refAmount.value = '0';
        }
      },
    ];
    const refDatePickerVisible = ref(false);
    const showDatePicker = () => refDatePickerVisible.value = true;
    const hideDatePicker = () => refDatePickerVisible.value = false;
    const setDate = (date: Date) => {
      context.emit('update:happenAt', date.toISOString());
      hideDatePicker();
    };
    const refAmount = ref(props.amount ? props.amount.toString() : '0');
    return () => (
      <div class={s.inputPad_wrapper}>
        <div class={s.showInfo}>
          <span class={s.createdAt}>
            <Icon name="test" class={s.date_icon}></Icon>
            <span class={s.date}>
              <span onClick={showDatePicker}>{new Time(props.happenAt).format()}</span>
              <Popup position="bottom" v-model:show={refDatePickerVisible.value}>
                <DatetimePicker value={props.happenAt} type="date" title="请选择时间" onConfirm={setDate}
                                onCancel={hideDatePicker}/>
              </Popup>
          </span>
          </span>
          <span class={s.amount}>{refAmount.value}</span>
        </div>
        <div class={s.buttons}>
          {buttons.map(button =>
            <button onClick={button.onClick}>{button.text}</button>)
          }
        </div>
      </div>
    );
  }
});

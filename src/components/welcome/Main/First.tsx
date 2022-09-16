import s from '../../../stylesheets/Welcome/WelcomeLayout.module.scss';
import {defineComponent, FunctionalComponent, ref, watchEffect} from 'vue';
import {useRouter} from 'vue-router';
import {useSwipe} from '../../../hooks/useSwipe';

export const First = defineComponent({
  setup() {
    const div = ref<HTMLElement>();
    const router = useRouter();
    const {swiping, direction} = useSwipe(div, {
      beforeStart: e => e.preventDefault()
    });
    watchEffect(() => {
      if (swiping.value && direction.value === 'left') {
        router.push('/welcome/2');
      }
    });
    return () => (
      <div class={s.wrapper}>
        <div class={s.card} ref={div}>
          <svg class={s.iconStyle}>
            <use xlinkHref="#first"></use>
          </svg>
          ,
          <div class={s.fontStyle}>
            <div>这是一段话<br/>这里还有一段话</div>
          </div>
        </div>
      </div>
    );
  }
});
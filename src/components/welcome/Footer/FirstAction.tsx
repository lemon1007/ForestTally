import {RouterLink} from 'vue-router';
import s from '../../../stylesheets/Welcome.module.scss';
import {FunctionalComponent} from 'vue';
import {SkipFeatures} from '../../../shared/SkipFeatures';

export const FirstAction: FunctionalComponent = () => {
  return (
    <div class={s.action}>
      <SkipFeatures class={s.fake}></SkipFeatures>
      <RouterLink class={s.next} to="/welcome/2">下一页</RouterLink>
      <SkipFeatures></SkipFeatures>
    </div>
  );
};

FirstAction.displayName = 'FirstAction';
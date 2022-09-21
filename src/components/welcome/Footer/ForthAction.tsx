import {RouterLink} from 'vue-router';
import s from '../../../stylesheets/Welcome.module.scss';
import {FunctionalComponent} from 'vue';
import {SkipFeatures} from '../../../shared/SkipFeatures';

const onClick = () => {
  localStorage.setItem('skipFeatures', 'yes');
};

export const ForthAction: FunctionalComponent = () => {
  return (
    <div class={s.action}>
      <SkipFeatures class={s.fake}></SkipFeatures>
      <span onClick={onClick}>
        <RouterLink class={s.next} to="/items">开启记账</RouterLink>
      </span>
      <SkipFeatures class={s.fake}></SkipFeatures>
    </div>
  );
};

ForthAction.displayName = 'ForthAction';
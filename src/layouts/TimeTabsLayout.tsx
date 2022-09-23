import {Component, DefineComponent, defineComponent, PropType, reactive, ref} from 'vue';
import {Form, FormItem} from '../shared/Form';
import {Time} from '../shared/time';
import {OverlayIcon} from '../shared/Overlay';
import {MainLayout} from './MainLayout';
import {Tab, Tabs} from '../shared/Tabs';
import {Dialog, Overlay} from 'vant';
import s from '../stylesheets/layouts/TimeTableLayout.module.scss';

const demo = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    },
  }
});

export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true
    },
    rerenderOnSwitchTab: {
      type: Boolean,
      default: false
    },
    hideThisYear: {
      type: Boolean,
      default: false
    }

  },
  setup: (props, context) => {
    const MONTH = 24 * 3600 * 1000 * 31;
    const refSelected = ref('本月');
    const time = new Time();
    const tempTime = reactive({
      start: new Time().format(),
      end: new Time().format()
    });
    // const ChangeTime = /(\d{4})\-(\d{2})\-(\d{2})/;
    const customTime = reactive<{ start?: string, end?: string }>({});
    const timeList = [
      {start: time.firstDayOfMonth(), end: time.lastDayOfMonth()},
      {start: time.add(-1, 'month').firstDayOfMonth(), end: time.add(-1, 'month').lastDayOfMonth()},
      {start: time.firstDayOfYear(), end: time.lastDayOfYear()}
    ];
    const refOverlayVisible = ref(false);
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault();
      refOverlayVisible.value = false;
      const subTempTimeStart = new Time(tempTime.start + 'T00:00:00.000+0800');
      const subTempTimeEnd = new Time(tempTime.end + 'T00:00:00.000+0800');
      if (subTempTimeEnd.getTimestamp() - subTempTimeStart.getTimestamp() <= MONTH) {
        if (subTempTimeEnd.getTimestamp() - subTempTimeStart.getTimestamp() < 0) {
          Dialog.confirm({
            title: '提示',
            message: '结束时间早于开始时间啦',
          });
        } else {
          Object.assign(customTime, tempTime);
        }
      } else {
        Dialog.confirm({
          title: '提示',
          message: '最多只能查31天的数据哦',
        });
      }
    };
    const onSelect = (value: string) => {
      if (value === '自定义') {
        refOverlayVisible.value = true;
      }
    };
    return () => (
      <MainLayout>{
        {
          title: () => '森林记账',
          icon: () => <OverlayIcon/>,
          default: () => <>
            {props.hideThisYear ? (
              <Tabs
                classPrefix="customTabs"
                v-model:selected={refSelected.value}
                onUpdate:selected={onSelect}
                rerenderOnSelect={props.rerenderOnSwitchTab}
              >
                <Tab value="本月" name="本月">
                  <props.component startDate={timeList[0].start.format()} endDate={timeList[0].end.format()}/>
                </Tab>
                <Tab value="上月" name="上月">
                  <props.component startDate={timeList[1].start.format()} endDate={timeList[1].end.format()}/>
                </Tab>
                <Tab value="自定义" name="自定义">
                  <props.component startDate={customTime.start} endDate={customTime.end}/>
                </Tab>
              </Tabs>
            ) : (
              <Tabs
                classPrefix="customTabs"
                v-model:selected={refSelected.value}
                onUpdate:selected={onSelect}
                rerenderOnSelect={props.rerenderOnSwitchTab}
              >
                <Tab value="本月" name="本月">
                  <props.component startDate={timeList[0].start.format()} endDate={timeList[0].end.format()}/>
                </Tab>
                <Tab value="上月" name="上月">
                  <props.component startDate={timeList[1].start.format()} endDate={timeList[1].end.format()}/>
                </Tab>
                <Tab value="今年" name="今年">
                  <props.component startDate={timeList[2].start.format()} endDate={timeList[2].end.format()}/>
                </Tab>
                <Tab value="自定义" name="自定义">
                  <props.component startDate={customTime.start} endDate={customTime.end}/>
                </Tab>
              </Tabs>
            )}
            <Overlay show={refOverlayVisible.value} class={s.overlay}>
              <div class={s.overlay_inner}>
                <header>
                  请选择时间
                </header>
                <main>
                  <Form onSubmit={onSubmitCustomTime}>
                    <FormItem label="开始时间" v-model={tempTime.start} type="date"/>
                    <FormItem label="结束时间" v-model={tempTime.end} type="date"/>
                    <FormItem>
                      <div class={s.actions}>
                        <button type="button" onClick={() => refOverlayVisible.value = false}>取消</button>
                        <button type="submit">确认</button>
                      </div>
                    </FormItem>
                  </Form>
                </main>
              </div>
            </Overlay>
          </>
        }
      }</MainLayout>
    );
  }
});

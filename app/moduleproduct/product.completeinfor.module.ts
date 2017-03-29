import {MarksRootComponent} from "../components/marks/marks.root.component";
/**
 * Created by 79078_000 on 2016/9/19.
 */

//提供一系列和 补全相关的组件
var ProductCompleteInforModule = angular.module("marksModule", ['ionic'])
    .component("marksRootComponent", new MarksRootComponent());

export {ProductCompleteInforModule};

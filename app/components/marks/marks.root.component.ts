import {DATA} from "../../models/intent.parammodel";
import {MarkNode} from "./mark.node";
/**
 * Created by 79078_000 on 2016/9/19.
 */


class MarksRootComponent implements angular.IComponentOptions {
    controller = MarksRootController;
    controllerAs = "vm";
    template = "<div data-ng-bind-html='vm.node' ></div>";
}

class MarksRootController implements angular.IComponentController {
    node: string;
    private markType: string;
    private markNodes: Array<MarkNode> = [
        new MarkNode("1", "<h1>我是一个NODE1</h1>"),
        new MarkNode("2", "<h1>我是一个NODE2</h1>"),
    ];

    constructor(private $state: angular.ui.IStateService,
                private $stateParams: angular.ui.IStateParamsService

    ) {
        this.markType = this.$stateParams[DATA];
        console.log("--MarksRootController执行了");

    }

    $onInit() {
        console.log("---------加载信息补全的根节点");
        var node: any;
        for (node in this.markNodes) {
            if (node.type == this.markType) {
                this.node = node.node;
                break;
            }
        }

        if (this.node == null) {
            this.node = this.markNodes[0].node;
        }

    }

}
MarksRootController.$inject=["$state","$stateParams" ];
export {MarksRootComponent,MarksRootController};

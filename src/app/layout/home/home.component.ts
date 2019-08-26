import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode, Tree, MenuItem, MessageService } from 'primeng/primeng';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  @ViewChild('expandingTree')
  expandingTree: Tree;

  treeData: TreeNode[];
  
  loading: boolean;

  files: any ={
};
data:any;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
      this.loading = true;
      this.homeService.getTreeViewData().subscribe(files => {
         this.data=files; 
         console.log(this.data[0].children);
         this.treeData=[{
            
                "label": "Product",
                "data": "Product",
                "expandedIcon": "fa fa-folder-open",
                "collapsedIcon": "fa fa-folder",
                "children": this.data[0].children
            
          },
          {
            
            "label": "Country",
            "data": "Country",
            "expandedIcon": "fa fa-folder-open",
            "collapsedIcon": "fa fa-folder",
            "children": this.data[1].children
        
      }]
   });
}


  private expandRecursive(node:TreeNode, isExpand:boolean){
      node.expanded = isExpand;
      if(node.children){
          node.children.forEach( childNode => {
              this.expandRecursive(childNode, isExpand);
          } );
      }
  }

}
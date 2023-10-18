import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ITreeHost, TREE_ELEMENT_REF, TREE_HOST } from '../tree/tree.component';

@Component({
  selector: 'app-tree-branch',
  template: `<span>tree branch works</span>`,

})
export class TreeBranchComponent implements OnInit {

  constructor(
    @Inject(TREE_HOST) private readonly treeHost: ITreeHost,
    @Inject(TREE_ELEMENT_REF) private readonly treeRef: ElementRef<HTMLElement>,
  ) { }

  ngOnInit(): void {
    console.log(this.treeRef.nativeElement);
    this.treeHost.grow();
    this.treeHost.bloom();
  }
}

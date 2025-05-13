import { IDGenerator } from "../../utilities/generators/IDGenerator";

export class TreeNode<T> {
  
  public data: T;
  private readonly _id: string = IDGenerator.get();
  private _height: number = 0;
  private _depth: number = 0;
  private parent: TreeNode<T> | null = null;
  private children: TreeNode<T>[] = [];

  constructor(data: T) {
    this.data = data;
  }

  public get depth(): number {
    return this._depth;
  }

  public get height(): number {
    return this._height;
  }

  public isRoot(): boolean {
    return this.parent === null && this._depth === 0;
  }

  public hasChildren(): boolean {
    return !!this.children.length;
  }

  public addChild(node: TreeNode<T>) {
    if(node.parent) {
      throw new Error(`The node cannot be added because it was already added to a tree.`);
    }
    node.parent = this;
    node._depth = this._depth + 1;
    this.reDepthChildren(node.children, node._depth);
    this.reHeightParent(this, node.height);
    this.children.push(node);
  }

  public detach() {
    
    if(this.isRoot()) {
      throw new Error('Unable to detach node because it is a root node');
    }

    if(!this.parent?.hasChildren()) {
      throw new Error('Unable to find node to detach');
    }

    for(let i = this.parent.children.length - 1; i >= 0; i--) {
      if(this.parent.children[i]._id === this._id) {
        this.parent.children.splice(i, 1);
        this._depth = 0;
        this.reDepthChildren(this.children, this._depth);
        const node: TreeNode<T> = this.getTallestChild();
        if(node) {
          this.reHeightParent(this, node.height);
        }
        break;
      }
    }
  }

  public traverse(fn: TreeTraversalCallback<T>): void {
    const queue: TreeNode<T>[] = [ this ];
    
    while(queue.length) {
      const currentNode: TreeNode<T> = queue.shift() as TreeNode<T>
      fn(currentNode);
      queue.push(...currentNode.children);
    }
  }

  private reDepthChildren(nodes: TreeNode<T>[], depth: number) {
    nodes.forEach((node: TreeNode<T>) => {
      node._depth = depth + 1;
      this.reDepthChildren(node.children, node._depth);
    });
  }

  private reHeightParent(node: TreeNode<T> | null, height: number) {
    if (!node) {
      return;
    }
    if (node._height > height + 1) {
      return;
    }
    node._height = height + 1;
    this.reHeightParent(node.parent, node._height);
  }

  private getTallestChild(): TreeNode<T> {
    let node: TreeNode<T> = this.children[0];

    for(let i = 1; i < this.children.length; i++) {
      if(node._height < this.children[i]._height) {
        node = this.children[i];
      }
    }

    return node;
  }
}

export type TreeTraversalCallback<T> = (node: TreeNode<T>) => void;
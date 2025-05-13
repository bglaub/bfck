export class TreeNode<T> {
  
  public data: T;
  private _height: number = 0;
  private _depth: number = 0;
  private parent: TreeNode<T> | null = null;
  private children: TreeNode<T>[] = [];

  constructor(data: T){
    this.data = data;
  }

  public get depth(): number {
    return this._depth;
  }

  public get height(): number {
    return this._height;
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

  private reDepthChildren(nodes: TreeNode<T>[], depth: number) {
    nodes.forEach((node: TreeNode<T>) => {
      node._depth = depth + 1;
      this.reDepthChildren(node.children, node._depth);
    });
  }

  public traverse(fn: TreeTraversalCallback<T>): void {
    const queue: TreeNode<T>[] = [ this ];
    
    while(queue.length) {
      const currentNode: TreeNode<T> = queue.shift() as TreeNode<T>
      fn(currentNode);
      queue.push(...currentNode.children);
    }
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
}

export type TreeTraversalCallback<T> = (node: TreeNode<T>) => void;
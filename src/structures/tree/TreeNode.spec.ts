import {TreeNode } from './TreeNode';

describe('TreeNode', () => {
  describe('constructor', () => {
    it('should construct', () => {

      const aNode: TreeNode<string> = new TreeNode('A');

      // Tree should look like this:
      //     A

      // Test node "A"
      expect(aNode.data).toEqual('A');
      expect(aNode.depth).toEqual(0);
      expect(aNode.height).toEqual(0);
      expect(aNode.isRoot()).toEqual(true);
      expect(aNode.hasChildren()).toEqual(false);
    });
  });

  describe('addChild', () => {
    it('should add child', () => {

      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');

      aNode.addChild(bNode);

      // Tree should look like this:
      //     A
      //     |
      //     B
      
      // Test node "A"
      expect(aNode.data).toEqual('A');
      expect(aNode.depth).toEqual(0);
      expect(aNode.height).toEqual(1);
      expect(aNode.isRoot()).toEqual(true);
      expect(aNode.hasChildren()).toEqual(true);

      // Test node "B"
      expect(bNode.data).toEqual('B');
      expect(bNode.depth).toEqual(1);
      expect(bNode.height).toEqual(0)
      expect(bNode.isRoot()).toEqual(false);
      expect(bNode.hasChildren()).toEqual(false);
    });

    it('should calculate depth', () => {

      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');
      const cNode: TreeNode<string> = new TreeNode('C');
      const dNode: TreeNode<string> = new TreeNode('D');
      const eNode: TreeNode<string> = new TreeNode('E');
      const fNode: TreeNode<string> = new TreeNode('F');
      const gNode: TreeNode<string> = new TreeNode('G');
      const hNode: TreeNode<string> = new TreeNode('H');
      const iNode: TreeNode<string> = new TreeNode('I');

      bNode.addChild(dNode);
      bNode.addChild(eNode);
      bNode.addChild(fNode);
      cNode.addChild(gNode);

      // Trees should look like this:
      //        b              c
      //     /  |  \           |
      //    /   |   \          |
      //   d    e    f         g

      // Test depth of nodes
      expect(aNode.depth).toEqual(0);
      expect(bNode.depth).toEqual(0);
      expect(cNode.depth).toEqual(0);
      expect(dNode.depth).toEqual(1);
      expect(eNode.depth).toEqual(1);
      expect(fNode.depth).toEqual(1);
      expect(hNode.depth).toEqual(0);
      expect(gNode.depth).toEqual(1);
      expect(iNode.depth).toEqual(0);

      eNode.addChild(hNode);
      gNode.addChild(iNode);

      // Trees should look like this:
      //        b              c
      //     /  |  \           |
      //    /   |   \          |
      //   d    e    f         g
      //        |              |
      //        |              |
      //        h              i

      // Test depth of each node
      expect(aNode.depth).toEqual(0);
      expect(bNode.depth).toEqual(0);
      expect(cNode.depth).toEqual(0);
      expect(dNode.depth).toEqual(1);
      expect(eNode.depth).toEqual(1);
      expect(fNode.depth).toEqual(1);
      expect(hNode.depth).toEqual(2);
      expect(gNode.depth).toEqual(1);
      expect(iNode.depth).toEqual(2);

      aNode.addChild(bNode);
      aNode.addChild(cNode);

      // Tree should look like this:
      //            a
      //          /   \
      //         /     \
      //        /       \
      //       b         c
      //    /  |  \      |
      //   /   |   \     |
      //  d    e    f    g
      //       |         |
      //       |         |
      //       h         i

      // Test depth of each node
      expect(aNode.depth).toEqual(0);
      expect(bNode.depth).toEqual(1);
      expect(cNode.depth).toEqual(1);
      expect(dNode.depth).toEqual(2);
      expect(eNode.depth).toEqual(2);
      expect(fNode.depth).toEqual(2);
      expect(hNode.depth).toEqual(3);
      expect(gNode.depth).toEqual(2);
      expect(iNode.depth).toEqual(3);
    });
    
    it('should calculate height', () => {
      
      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');
      const cNode: TreeNode<string> = new TreeNode('C');
      const dNode: TreeNode<string> = new TreeNode('D');
      const eNode: TreeNode<string> = new TreeNode('E');
      const fNode: TreeNode<string> = new TreeNode('F');
      const gNode: TreeNode<string> = new TreeNode('G');
      const hNode: TreeNode<string> = new TreeNode('H');
      const iNode: TreeNode<string> = new TreeNode('I');
      const jNode: TreeNode<string> = new TreeNode('J');
      const kNode: TreeNode<string> = new TreeNode('K');

      expect(aNode.height).toEqual(0);

      bNode.addChild(dNode);

      expect(bNode.height).toEqual(1);
      expect(dNode.height).toEqual(0);

      bNode.addChild(eNode);
      
      expect(bNode.height).toEqual(1);
      expect(eNode.height).toEqual(0);

      bNode.addChild(fNode);
      
      expect(bNode.height).toEqual(1);
      expect(fNode.height).toEqual(0);

      eNode.addChild(hNode);

      expect(bNode.height).toEqual(2);
      expect(eNode.height).toEqual(1);
      expect(hNode.height).toEqual(0);

      cNode.addChild(gNode);

      expect(cNode.height).toEqual(1);
      expect(gNode.height).toEqual(0);

      gNode.addChild(iNode);
      
      expect(cNode.height).toEqual(2);
      expect(gNode.height).toEqual(1);
      expect(iNode.height).toEqual(0);

      aNode.addChild(bNode);
      
      expect(aNode.height).toEqual(3);

      aNode.addChild(cNode);

      expect(aNode.height).toEqual(3);
      expect(bNode.height).toEqual(2);
      expect(cNode.height).toEqual(2);
      expect(dNode.height).toEqual(0);
      expect(eNode.height).toEqual(1);
      expect(fNode.height).toEqual(0);
      expect(gNode.height).toEqual(1);
      expect(hNode.height).toEqual(0);
      expect(iNode.height).toEqual(0);

      jNode.addChild(kNode);
      aNode.addChild(jNode);

      expect(aNode.height).toEqual(3);
      expect(bNode.height).toEqual(2);
      expect(cNode.height).toEqual(2);
      expect(dNode.height).toEqual(0);
      expect(eNode.height).toEqual(1);
      expect(fNode.height).toEqual(0);
      expect(gNode.height).toEqual(1);
      expect(hNode.height).toEqual(0);
      expect(iNode.height).toEqual(0);
      expect(jNode.height).toEqual(1);
      expect(kNode.height).toEqual(0);
    });

    it('should error if node added as child to two different nodes', () => {
      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');
      const cNode: TreeNode<string> = new TreeNode('C');
      
      aNode.addChild(bNode);
      
      expect(() => {
        cNode.addChild(bNode);
      }).toThrow('The node cannot be added because it was already added to a tree.');
    })
  });

  describe('detach', () => {
    it('should detach child', () => {
      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');

      aNode.addChild(bNode);
      
      // Tree should look like this:
      //     A
      //     |
      //     B
      
      // Test node "A"
      expect(aNode.data).toEqual('A');
      expect(aNode.depth).toEqual(0);
      expect(aNode.isRoot()).toEqual(true);
      expect(aNode.hasChildren()).toEqual(true);

      // Test node "B"
      expect(bNode.data).toEqual('B');
      expect(bNode.depth).toEqual(1);
      expect(bNode.isRoot()).toEqual(false);
      expect(bNode.hasChildren()).toEqual(false);

      bNode.detach();

      // Trees should look like this:
      //     A     B

      // Retest node "A"
      expect(aNode.data).toEqual('A');
      expect(aNode.depth).toEqual(0);
      expect(aNode.height).toEqual(0);
      expect(aNode.isRoot()).toEqual(true);
      expect(aNode.hasChildren()).toEqual(false);

      // Retest node "B"
      expect(bNode.data).toEqual('B');
      expect(bNode.depth).toEqual(0);
      expect(bNode.isRoot()).toEqual(true);
      expect(bNode.hasChildren()).toEqual(false);
    });

    it('should error if detaching a root node', () => {
      expect(() => {
        (new TreeNode('A')).detach();
      }).toThrow('Unable to detach node because it is a root node.');
    });

    it('should error if detaching an orphaned node', () => {
      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');

      aNode.addChild(bNode);
      
      // Tree should look like this:
      //     A
      //     |
      //     B

      /*
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!                                                                    !!!
      !!!         #     #    #    ######  #     # ### #     #  #####         !!!    
      !!!         #  #  #   # #   #     # ##    #  #  ##    # #     #        !!!
      !!!         #  #  #  #   #  #     # # #   #  #  # #   # #              !!!
      !!!         #  #  # #     # ######  #  #  #  #  #  #  # #  ####        !!!
      !!!         #  #  # ####### #   #   #   # #  #  #   # # #     #        !!!
      !!!         #  #  # #     # #    #  #    ##  #  #    ## #     #        !!!
      !!!          ## ##  #     # #     # #     # ### #     #  #####         !!!
      !!!                                                                    !!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!                                                                    !!!
      !!! This should never happen because code will prevent it, so there is !!!
      !!! no good way to test without messing with the internal child        !!!
      !!! structure. Meaning the test could start to fail if that structure  !!!
      !!! changes.                                                           !!!
      !!!                                                                    !!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      */
      (aNode as any).childrenMap.clear();

      expect(() => {
        bNode.detach();
      }).toThrow('Unable to find node to detach.');
    });
  });

  describe('traverse', () => {
    it('should traverse all nodes in order', () => {
      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');
      const cNode: TreeNode<string> = new TreeNode('C');
      const dNode: TreeNode<string> = new TreeNode('D');
      const eNode: TreeNode<string> = new TreeNode('E');
      const fNode: TreeNode<string> = new TreeNode('F');
      const gNode: TreeNode<string> = new TreeNode('G');
      const hNode: TreeNode<string> = new TreeNode('H');
      const iNode: TreeNode<string> = new TreeNode('I');

      aNode.addChild(bNode);
      aNode.addChild(cNode);
      bNode.addChild(dNode);
      bNode.addChild(eNode);
      bNode.addChild(fNode);
      eNode.addChild(hNode);
      cNode.addChild(gNode);
      gNode.addChild(iNode);

      const expected: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

      aNode.traverse((node: TreeNode<string>): void => {
        expect(node.data).toEqual(expected.shift());
      });
    });
  });
});
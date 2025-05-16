import {TreeNode } from './TreeNode';

describe('TreeNode', () => {
  describe('constructor', () => {
    it('should construct', () => {

      const aNode: TreeNode<string> = new TreeNode('A');

      // Tree should look like this:
      //     A

      // Test node "A"
      expect(aNode.data).toEqual('A');
      expect(aNode.getDepth()).toEqual(0);
      expect(aNode.getHeight()).toEqual(0);
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
      expect(aNode.getDepth()).toEqual(0);
      expect(aNode.getHeight()).toEqual(1);
      expect(aNode.isRoot()).toEqual(true);
      expect(aNode.hasChildren()).toEqual(true);

      // Test node "B"
      expect(bNode.data).toEqual('B');
      expect(bNode.getDepth()).toEqual(1);
      expect(bNode.getHeight()).toEqual(0)
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
      expect(aNode.getDepth()).toEqual(0);
      expect(bNode.getDepth()).toEqual(0);
      expect(cNode.getDepth()).toEqual(0);
      expect(dNode.getDepth()).toEqual(1);
      expect(eNode.getDepth()).toEqual(1);
      expect(fNode.getDepth()).toEqual(1);
      expect(hNode.getDepth()).toEqual(0);
      expect(gNode.getDepth()).toEqual(1);
      expect(iNode.getDepth()).toEqual(0);

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
      expect(aNode.getDepth()).toEqual(0);
      expect(bNode.getDepth()).toEqual(0);
      expect(cNode.getDepth()).toEqual(0);
      expect(dNode.getDepth()).toEqual(1);
      expect(eNode.getDepth()).toEqual(1);
      expect(fNode.getDepth()).toEqual(1);
      expect(hNode.getDepth()).toEqual(2);
      expect(gNode.getDepth()).toEqual(1);
      expect(iNode.getDepth()).toEqual(2);

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
      expect(aNode.getDepth()).toEqual(0);
      expect(bNode.getDepth()).toEqual(1);
      expect(cNode.getDepth()).toEqual(1);
      expect(dNode.getDepth()).toEqual(2);
      expect(eNode.getDepth()).toEqual(2);
      expect(fNode.getDepth()).toEqual(2);
      expect(hNode.getDepth()).toEqual(3);
      expect(gNode.getDepth()).toEqual(2);
      expect(iNode.getDepth()).toEqual(3);
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

      expect(aNode.getHeight()).toEqual(0);

      bNode.addChild(dNode);

      expect(bNode.getHeight()).toEqual(1);
      expect(dNode.getHeight()).toEqual(0);

      bNode.addChild(eNode);
      
      expect(bNode.getHeight()).toEqual(1);
      expect(eNode.getHeight()).toEqual(0);

      bNode.addChild(fNode);
      
      expect(bNode.getHeight()).toEqual(1);
      expect(fNode.getHeight()).toEqual(0);

      eNode.addChild(hNode);

      expect(bNode.getHeight()).toEqual(2);
      expect(eNode.getHeight()).toEqual(1);
      expect(hNode.getHeight()).toEqual(0);

      cNode.addChild(gNode);

      expect(cNode.getHeight()).toEqual(1);
      expect(gNode.getHeight()).toEqual(0);

      gNode.addChild(iNode);
      
      expect(cNode.getHeight()).toEqual(2);
      expect(gNode.getHeight()).toEqual(1);
      expect(iNode.getHeight()).toEqual(0);

      aNode.addChild(bNode);
      
      expect(aNode.getHeight()).toEqual(3);

      aNode.addChild(cNode);

      expect(aNode.getHeight()).toEqual(3);
      expect(bNode.getHeight()).toEqual(2);
      expect(cNode.getHeight()).toEqual(2);
      expect(dNode.getHeight()).toEqual(0);
      expect(eNode.getHeight()).toEqual(1);
      expect(fNode.getHeight()).toEqual(0);
      expect(gNode.getHeight()).toEqual(1);
      expect(hNode.getHeight()).toEqual(0);
      expect(iNode.getHeight()).toEqual(0);

      jNode.addChild(kNode);
      aNode.addChild(jNode);

      expect(aNode.getHeight()).toEqual(3);
      expect(bNode.getHeight()).toEqual(2);
      expect(cNode.getHeight()).toEqual(2);
      expect(dNode.getHeight()).toEqual(0);
      expect(eNode.getHeight()).toEqual(1);
      expect(fNode.getHeight()).toEqual(0);
      expect(gNode.getHeight()).toEqual(1);
      expect(hNode.getHeight()).toEqual(0);
      expect(iNode.getHeight()).toEqual(0);
      expect(jNode.getHeight()).toEqual(1);
      expect(kNode.getHeight()).toEqual(0);
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
      expect(aNode.getDepth()).toEqual(0);
      expect(aNode.isRoot()).toEqual(true);
      expect(aNode.hasChildren()).toEqual(true);

      // Test node "B"
      expect(bNode.data).toEqual('B');
      expect(bNode.getDepth()).toEqual(1);
      expect(bNode.isRoot()).toEqual(false);
      expect(bNode.hasChildren()).toEqual(false);

      bNode.detach();

      // Trees should look like this:
      //     A     B

      // Retest node "A"
      expect(aNode.data).toEqual('A');
      expect(aNode.getDepth()).toEqual(0);
      expect(aNode.getHeight()).toEqual(0);
      expect(aNode.isRoot()).toEqual(true);
      expect(aNode.hasChildren()).toEqual(false);

      // Retest node "B"
      expect(bNode.data).toEqual('B');
      expect(bNode.getDepth()).toEqual(0);
      expect(bNode.isRoot()).toEqual(true);
      expect(bNode.hasChildren()).toEqual(false);
    });

    it('should recalculate heights, depths, and siblings on left node removal', () => {
      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');
      const cNode: TreeNode<string> = new TreeNode('C');
      const dNode: TreeNode<string> = new TreeNode('D');
      const eNode: TreeNode<string> = new TreeNode('E');
      const fNode: TreeNode<string> = new TreeNode('F');
      const gNode: TreeNode<string> = new TreeNode('G');
      const iNode: TreeNode<string> = new TreeNode('I');
      const jNode: TreeNode<string> = new TreeNode('J');
      const kNode: TreeNode<string> = new TreeNode('K');

      aNode.addChild(bNode);
      aNode.addChild(cNode);
      aNode.addChild(jNode);
      bNode.addChild(dNode);
      bNode.addChild(eNode);
      bNode.addChild(fNode);
      cNode.addChild(gNode);
      gNode.addChild(iNode);
      jNode.addChild(kNode);

      // Tree should look like this:
      //                 a
      //            /    |    \
      //           /     |     \
      //          /      |      \
      //         /       |       \
      //        /        |        \
      //       b         c         j
      //    /  |  \      |         |
      //   /   |   \     |         |
      //  d    e    f    g         k
      //                 |
      //                 |
      //                 i

      bNode.detach();
      
      // Trees should look like this:
      //      b          a
      //   /  |  \       | \
      //  /   |   \      |  \
      // d    e    f     c    j
      //                 |    |
      //                 |    |
      //                 g    k
      //                 |
      //                 |
      //                 i

      // Test height of "A" node tree
      expect(aNode.getHeight()).toEqual(3);
      expect(cNode.getHeight()).toEqual(2);
      expect(gNode.getHeight()).toEqual(1);
      expect(iNode.getHeight()).toEqual(0);
      expect(jNode.getHeight()).toEqual(1);
      expect(kNode.getHeight()).toEqual(0);

      // Test height of "B" node tree
      expect(bNode.getHeight()).toEqual(1);
      expect(dNode.getHeight()).toEqual(0);
      expect(eNode.getHeight()).toEqual(0);
      expect(fNode.getHeight()).toEqual(0);

      // Test depth of "A" node tree
      expect(aNode.getDepth()).toEqual(0);
      expect(cNode.getDepth()).toEqual(1);
      expect(gNode.getDepth()).toEqual(2);
      expect(iNode.getDepth()).toEqual(3);
      expect(jNode.getDepth()).toEqual(1);
      expect(kNode.getDepth()).toEqual(2);

      // Test depth of "B" node tree
      expect(bNode.getDepth()).toEqual(0);
      expect(dNode.getDepth()).toEqual(1);
      expect(eNode.getDepth()).toEqual(1);
      expect(fNode.getDepth()).toEqual(1);

      // Test "B" node siblings
      expect(bNode.getLeftSibling()).toBeUndefined();
      expect(bNode.getRightSibling()).toBeUndefined();

      // Test "C" node siblings
      expect(cNode.getLeftSibling()).toBeUndefined();
      expect(cNode.getRightSibling()).toBeDefined();
      expect(cNode.getRightSibling()?.data).toEqual(jNode.data);

      // Test "J" node siblings
      expect(jNode.getLeftSibling()).toBeDefined();
      expect(jNode.getRightSibling()).toBeUndefined();
      expect(jNode.getLeftSibling()?.data).toEqual(cNode.data);
    });

    it('should recalculate heights, depths, and siblings on middle node removal', () => {
      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');
      const cNode: TreeNode<string> = new TreeNode('C');
      const dNode: TreeNode<string> = new TreeNode('D');
      const eNode: TreeNode<string> = new TreeNode('E');
      const fNode: TreeNode<string> = new TreeNode('F');
      const gNode: TreeNode<string> = new TreeNode('G');
      const iNode: TreeNode<string> = new TreeNode('I');
      const jNode: TreeNode<string> = new TreeNode('J');
      const kNode: TreeNode<string> = new TreeNode('K');

      aNode.addChild(bNode);
      aNode.addChild(cNode);
      aNode.addChild(jNode);
      bNode.addChild(dNode);
      bNode.addChild(eNode);
      bNode.addChild(fNode);
      cNode.addChild(gNode);
      gNode.addChild(iNode);
      jNode.addChild(kNode);

      // Tree should look like this:
      //                 a
      //            /    |    \
      //           /     |     \
      //          /      |      \
      //         /       |       \
      //        /        |        \
      //       b         c         j
      //    /  |  \      |         |
      //   /   |   \     |         |
      //  d    e    f    g         k
      //                 |
      //                 |
      //                 i

      cNode.detach();

      // Trees should look like this:
      //            a          c
      //         /     \       |
      //        /       \      |
      //       b         j     g
      //    /  |  \      |     |
      //   /   |   \     |     |
      //  d    e    f    k     i

      // Test height of "A" node tree
      expect(aNode.getHeight()).toEqual(2);
      expect(bNode.getHeight()).toEqual(1);
      expect(jNode.getHeight()).toEqual(1);
      expect(dNode.getHeight()).toEqual(0);
      expect(eNode.getHeight()).toEqual(0);
      expect(fNode.getHeight()).toEqual(0);
      expect(kNode.getHeight()).toEqual(0);

      // Test height of "C" node tree
      expect(cNode.getHeight()).toEqual(2);
      expect(gNode.getHeight()).toEqual(1);
      expect(iNode.getHeight()).toEqual(0);

      // Test depth of "A" node tree
      expect(aNode.getDepth()).toEqual(0);
      expect(bNode.getDepth()).toEqual(1);
      expect(jNode.getDepth()).toEqual(1);
      expect(dNode.getDepth()).toEqual(2);
      expect(eNode.getDepth()).toEqual(2);
      expect(fNode.getDepth()).toEqual(2);
      expect(kNode.getDepth()).toEqual(2);

      // Test depth of "C" node tree
      expect(cNode.getDepth()).toEqual(0);
      expect(gNode.getDepth()).toEqual(1);
      expect(iNode.getDepth()).toEqual(2);

      // Test "C" node siblings
      expect(cNode.getLeftSibling()).toBeUndefined();
      expect(cNode.getRightSibling()).toBeUndefined();

      // Test "B" node siblings
      expect(bNode.getLeftSibling()).toBeUndefined();
      expect(bNode.getRightSibling()).toBeDefined();
      expect(bNode.getRightSibling()?.data).toEqual(jNode.data);

      // Test "J" node siblings
      expect(jNode.getLeftSibling()).toBeDefined();
      expect(jNode.getRightSibling()).toBeUndefined();
      expect(jNode.getLeftSibling()?.data).toEqual(bNode.data);
    });

    it('should recalculate heights, depths, and siblings on right node removal', () => {
      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');
      const cNode: TreeNode<string> = new TreeNode('C');
      const dNode: TreeNode<string> = new TreeNode('D');
      const eNode: TreeNode<string> = new TreeNode('E');
      const fNode: TreeNode<string> = new TreeNode('F');
      const gNode: TreeNode<string> = new TreeNode('G');
      const iNode: TreeNode<string> = new TreeNode('I');
      const jNode: TreeNode<string> = new TreeNode('J');
      const kNode: TreeNode<string> = new TreeNode('K');

      aNode.addChild(bNode);
      aNode.addChild(cNode);
      aNode.addChild(jNode);
      bNode.addChild(dNode);
      bNode.addChild(eNode);
      bNode.addChild(fNode);
      cNode.addChild(gNode);
      gNode.addChild(iNode);
      jNode.addChild(kNode);

      // Tree should look like this:
      //                 a
      //            /    |    \
      //           /     |     \
      //          /      |      \
      //         /       |       \
      //        /        |        \
      //       b         c         j
      //    /  |  \      |         |
      //   /   |   \     |         |
      //  d    e    f    g         k
      //                 |
      //                 |
      //                 i

      jNode.detach();

      // Trees should look like this:
      //            a          j
      //         /     \       |
      //        /       \      |
      //       b         c     k
      //    /  |  \      |
      //   /   |   \     |
      //  d    e    f    g
      //                 |
      //                 |
      //                 i

      // Test height of "A" node tree
      expect(aNode.getHeight()).toEqual(3);
      expect(bNode.getHeight()).toEqual(1);
      expect(dNode.getHeight()).toEqual(0);
      expect(eNode.getHeight()).toEqual(0);
      expect(fNode.getHeight()).toEqual(0);
      expect(cNode.getHeight()).toEqual(2);
      expect(gNode.getHeight()).toEqual(1);
      expect(iNode.getHeight()).toEqual(0);

      // Test height of "J" node tree
      expect(jNode.getHeight()).toEqual(1);
      expect(kNode.getHeight()).toEqual(0);

      // Test depth of "A" node tree
      expect(aNode.getDepth()).toEqual(0);
      expect(bNode.getDepth()).toEqual(1);
      expect(dNode.getDepth()).toEqual(2);
      expect(eNode.getDepth()).toEqual(2);
      expect(fNode.getDepth()).toEqual(2);
      expect(cNode.getDepth()).toEqual(1);
      expect(gNode.getDepth()).toEqual(2);
      expect(iNode.getDepth()).toEqual(3);

      // Test depth of "J" node tree
      expect(jNode.getDepth()).toEqual(0);
      expect(kNode.getDepth()).toEqual(1);

      // Test "J" node siblings
      expect(jNode.getLeftSibling()).toBeUndefined();
      expect(jNode.getRightSibling()).toBeUndefined();

      // Test "C" node siblings
      expect(cNode.getLeftSibling()).toBeDefined();
      expect(cNode.getRightSibling()).toBeUndefined();
      expect(cNode.getLeftSibling()?.data).toEqual(bNode.data);

      // Test "B" node siblings
      expect(bNode.getLeftSibling()).toBeUndefined();
      expect(bNode.getRightSibling()).toBeDefined();
      expect(bNode.getRightSibling()?.data).toEqual(cNode.data);
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

      // Tree should look like this:
      //           a
      //        /     \
      //       /       \
      //      b         c
      //   /  |  \      |
      //  /   |   \     |
      // d    e    f    g
      //      |         |
      //      |         |
      //      h         i

      const expected: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

      aNode.traverse((node: TreeNode<string>): void => {
        expect(node.data).toEqual(expected.shift());
      });
    });
  });
});
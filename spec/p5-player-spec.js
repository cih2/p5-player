'use babel';

import P5Player from '../lib/p5-player';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('P5Player', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('p5-player');
  });

  describe('when the p5-player:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.p5-player')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'p5-player:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.p5-player')).toExist();

        let p5PlayerElement = workspaceElement.querySelector('.p5-player');
        expect(p5PlayerElement).toExist();

        let p5PlayerPanel = atom.workspace.panelForItem(p5PlayerElement);
        expect(p5PlayerPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'p5-player:toggle');
        expect(p5PlayerPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.p5-player')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'p5-player:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let p5PlayerElement = workspaceElement.querySelector('.p5-player');
        expect(p5PlayerElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'p5-player:toggle');
        expect(p5PlayerElement).not.toBeVisible();
      });
    });
  });
});

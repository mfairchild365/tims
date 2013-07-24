/**
 * Adds link to toggle syntax highlighting.
 * This code from cpn (Code Per Node) module.
 */

(function ($) {

  Drupal.behaviors.timsCodeMirror = {

    attach: function(context, settings) {

      // Append enable/disable link.
      $('.form-item-template label').append('<a href="#" class="codemirror-toggle">Enable syntax highlighting</a>');

      // Toggle syntax highlighting.
      $('.codemirror-toggle').click(function() {
        var $textarea = $(this).parents('.form-item').find('textarea');
        var $grippie = $textarea.parents('.resizable-textarea').find('.grippie');
        var type = $textarea.attr('id').replace('edit-tims-', '');

        // Enable
        if (!$(this).hasClass('enabled')) {
          $grippie.hide();
          var editor = CodeMirror.fromTextArea($textarea.get(0), {
            mode: 'twig',
            lineNumbers: true,
            tabMode: 'shift',
            tabSize: 2
          });
          // Set the editor height to fill as much of the viewport as possible.
          // (offset is an arbitrary number selected using the Seven theme.)
          var offset = 450;
          editor.setSize(null, $(window).height() - offset);
          $(window).resize(function() {
            editor.setSize(null, $(window).height() - offset);
          });

          $(this).data('editor', editor);
          $(this).text(Drupal.t('Disable syntax highlighting')).addClass('enabled');
          $.cookie('codeHighlight', true);
        }

        // Disable
        else {
          $(this).data('editor').toTextArea();
          $grippie.show();
          $(this).text(Drupal.t('Enable syntax highlighting')).removeClass('enabled');
          $.cookie('codeHighlight', null);
        }
        return false;
      });

      // Enable on page load if cookie is set.
      if ($.cookie('codeHighlight')) {
        $('.codemirror-toggle').click();
      }

    }

  };

})(jQuery);

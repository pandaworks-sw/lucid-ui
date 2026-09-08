Feature: Accessible shared interactions
  Scenario: Recognize icon-only actions
    Given an icon-only action preset or tooltip
    When the control is exposed to assistive technology
    Then it has a meaningful name and explicit consumer labels take precedence

  Scenario: Wait for a pending action
    When an action button is loading
    Then it exposes busy state and cannot fire again

  Scenario: Reduce animation
    Given reduced motion is enabled or duration is not positive
    When a number changes
    Then the final value appears immediately

  Scenario: Validate a release
    When a package is released or published
    Then the build and regression checks must pass before publishing or creating a release

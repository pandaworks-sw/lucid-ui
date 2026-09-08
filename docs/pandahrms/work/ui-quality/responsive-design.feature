Feature: Readable responsive library views
  Scenario: Clear page hierarchy
    Given a desktop or mobile showcase
    Then page titles are at least 24px and short headline metrics at least 28px
    And the Projects page has one primary New project action

  Scenario: Read without horizontal page overflow
    Given a viewport of 390px or 1440px in light or dark mode
    When the dashboard or projects page is shown
    Then the page stays within the viewport and row actions remain reachable

  Scenario: Accessible themed colors
    Then supporting text and brand action text have at least 4.5 to 1 contrast on their surfaces
    And focus rings have at least 3 to 1 contrast

  Scenario: Use the component gallery on mobile
    Given a mobile viewport
    Then component navigation can be opened and dismissed
    And the component content uses the available width

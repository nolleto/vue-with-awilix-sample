module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  transformIgnorePatterns: [
    '<rootDir>/(node_modules)/?!(vuex-composition-helpers|vue-awesome)'
  ],
  moduleNameMapper: {
    '^@test/(.*)$': '<rootDir>/tests/unit/support/modules/$1',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js'
  }
}

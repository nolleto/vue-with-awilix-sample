module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  transformIgnorePatterns: [
    '<rootDir>/(node_modules)/(?!vuex-composition-helpers)'
  ],
  moduleNameMapper: {
    '^@test/(.*)$': '<rootDir>/tests/unit/support/modules/$1'
  }
}

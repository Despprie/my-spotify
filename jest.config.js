module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/coverage', '<rootDir>/dist'],
    moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
    moduleNameMapper: {
        '~/pages/(.*)': '<rootDir>/src/pages/$1',
        '~/styles/(.*)': '<rootDir>/src/styles/$1',
        '~/components/(.*)': '<rootDir>/src/components/$1',
        '~/hooks/(.*)': '<rootDir>/src/hooks/$1',
        '~/store/(.*)': '<rootDir>/src/store/$1',
        '~/utils/(.*)': '<rootDir>/src/utils/$1'
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
        }
    }
};

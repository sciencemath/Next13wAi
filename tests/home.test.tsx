import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HomePage from '../app/page';

vi.mock('@clerk/nextjs', () => ({
  auth: () => new Promise((resolve) => resolve({ userId: 'madeupuseridhere' })),
  ClerkProvider: ({ children }) => <div>{children}</div>,
  useUser: () => ({
    isSignedIn: true,
    user: {
      id: 'useusermockid',
      fullName: 'Mathias',
    },
  }),
}));

test('Home', async () => {
  render(await HomePage());
  expect(
    screen.getByText('A Journal app with Ai sentiment analysis.')
  ).toBeTruthy();
});

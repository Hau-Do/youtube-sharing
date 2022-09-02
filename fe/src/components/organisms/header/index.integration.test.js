const { render, screen, waitFor } = require('@testing-library/react');
const { default: userEvent } = require('@testing-library/user-event');
const { default: MemberGuard } = require('guards/member');
const { BrowserRouter } = require('react-router-dom');
const { RoutesString } = require('routes/routesString');
const { default: useAuthStore } = require('stores/auth');
const { default: Header } = require('.');

const initialStoreState = useAuthStore.getState();
describe('<Header />', () => {
  beforeEach(() => {
    useAuthStore.setState(initialStoreState, true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should redirect to specific route', async () => {
    const state = {
      user: {
        email: 'test@gmail.com',
        id: '6303cdd1e365a8001d1ea2b0',
      },
      isLoading: false,
      rebound: true,
      tokens: {
        access: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzAzY2RkMWUzNjVhODAwMWQxZWEyYjAiLCJpYXQiOjE2NjEyNzE2ODYsImV4cCI6MTY2MTI3MzQ4NiwidHlwZSI6ImFjY2VzcyJ9.uHGG8vvlXKqkJgZDqZYdk0AqDM61I6KJi7xMT81dgI0',
          expires: '2022-08-23T16:51:26.944Z',
        },
        refresh: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzAzY2RkMWUzNjVhODAwMWQxZWEyYjAiLCJpYXQiOjE2NjEyNzE2ODYsImV4cCI6MTY2Mzg2MzY4NiwidHlwZSI6InJlZnJlc2gifQ.3F3g43V2qJ_ghkrTo8YwSR93RjNe0GsVf_urwyfbJSw',
          expires: '2022-09-22T16:21:26.946Z',
        },
      },
    };
    useAuthStore.setState(state);
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText('Share a movie')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Share a movie'));
    await waitFor(() => {
      expect(global.window.location.href).toContain(RoutesString.Share);
    });

    await userEvent.click(screen.getByText('Funny Movies'));
    await waitFor(() => {
      expect(global.window.location.href).toEqual('http://localhost/');
    });
  });

  test('click logout should redirect to home page when user in share page', async () => {
    const MockComponent = () => {
      return (
        <BrowserRouter>
          <MemberGuard>
            <Header />
          </MemberGuard>
        </BrowserRouter>
      );
    };
    const state = {
      ...initialStoreState,
      user: {
        email: 'test@gmail.com',
        id: '6303cdd1e365a8001d1ea2b0',
      },
      isLoading: false,
      rebound: true,
      tokens: {
        access: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzAzY2RkMWUzNjVhODAwMWQxZWEyYjAiLCJpYXQiOjE2NjEyNzE2ODYsImV4cCI6MTY2MTI3MzQ4NiwidHlwZSI6ImFjY2VzcyJ9.uHGG8vvlXKqkJgZDqZYdk0AqDM61I6KJi7xMT81dgI0',
          expires: '2022-08-23T16:51:26.944Z',
        },
        refresh: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzAzY2RkMWUzNjVhODAwMWQxZWEyYjAiLCJpYXQiOjE2NjEyNzE2ODYsImV4cCI6MTY2Mzg2MzY4NiwidHlwZSI6InJlZnJlc2gifQ.3F3g43V2qJ_ghkrTo8YwSR93RjNe0GsVf_urwyfbJSw',
          expires: '2022-09-22T16:21:26.946Z',
        },
      },
    };
    useAuthStore.setState(state);
    render(<MockComponent />);

    await userEvent.click(screen.getByText('Share a movie'));
    await waitFor(() => {
      expect(global.window.location.href).toContain(RoutesString.Share);
    });

    await userEvent.click(screen.getByText('Logout'));
    await waitFor(() => {
      expect(global.window.location.href).toEqual('http://localhost/');
    });
  });
});

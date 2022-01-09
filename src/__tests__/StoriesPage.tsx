import React from 'react';
import {render, screen, waitFor, within} from '@testing-library/react';
import {StoriesPage} from "../pages/StoriesPage";
import {api} from "../hooks/api";
import {Story} from "../hooks/api/types";
import {MemoryRouter} from "react-router-dom";
import {mocked} from "jest-mock";


jest.mock('../hooks/api/StoriesEndpoint')
const mockedApi = mocked(api, true)
beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})
test('Renders Stories page', async () => {
  const REQUEST_DELAY = 1000
  const TEST_STORIES: Story[] = [
    {id: 1, name: 'test story 1', rootId: 1},
    {id: 2, name: 'test story 2', rootId: 4},
  ]
  mockedApi.stories.getAll.mockImplementation(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(TEST_STORIES)
      }, REQUEST_DELAY)
    })
  })
  render(
    <MemoryRouter>
      <StoriesPage />
    </MemoryRouter>
  );

  const loader = screen.getByTestId('backdrop')
  expect(loader).toBeVisible() // лоадер не пропадает после 1с, остаётся opacity: 1, но только в тестах
  jest.advanceTimersByTime(REQUEST_DELAY)
  const cards = await screen.findAllByTestId('StoryCard');
  expect(cards.length).toEqual(TEST_STORIES.length)
});

test('Shows confirmation before deleting', async () => {
  const REQUEST_DELAY = 1000
  const TEST_STORIES: Story[] = [
    {id: 1, name: 'test story 1', rootId: 1},
    {id: 2, name: 'test story 2', rootId: 4},
  ]
  mockedApi.stories.getAll.mockImplementation(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(TEST_STORIES)
      }, REQUEST_DELAY)
    })
  })
  mockedApi.stories.destroy.mockImplementation((id: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = TEST_STORIES.findIndex(story => story.id === id)
        TEST_STORIES.splice(index, 1)
        resolve()
      }, REQUEST_DELAY)
    })
  })

  render(
    <MemoryRouter>
      <StoriesPage/>
    </MemoryRouter>
  )

  jest.advanceTimersByTime(REQUEST_DELAY)

  const deleteButton = await screen.findAllByText(/delete/i)
  deleteButton[0].click()
  const deleteDialog = screen.getByTestId('StoryDeleteDialog')
  expect(deleteDialog).toBeVisible()
  const confirmButton = within(deleteDialog).getByTestId('DeleteConfirm')
  confirmButton.click()
  jest.advanceTimersByTime(REQUEST_DELAY)
  expect(TEST_STORIES).toHaveLength(1)
  await waitFor(() => {
    expect(screen.queryAllByTestId('StoryCard')).toHaveLength(1)
  })
})

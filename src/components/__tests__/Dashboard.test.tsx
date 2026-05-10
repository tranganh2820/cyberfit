import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MetricCard, QuickLog } from '../Dashboard'
import { logWorkout } from '@/lib/actions'

// Mock logWorkout action
vi.mock('@/lib/actions', () => ({
  logWorkout: vi.fn(),
}))

describe('Dashboard Components', () => {
  describe('MetricCard', () => {
    it('renders label and value correctly', () => {
      render(
        <MetricCard 
          label="Test Metric" 
          value="100" 
          unit="UNITS" 
          trend="+5%" 
          color="cyan" 
        />
      )
      
      expect(screen.getByText('Test Metric')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
      expect(screen.getByText('UNITS')).toBeInTheDocument()
      expect(screen.getByText('+5%')).toBeInTheDocument()
    })
  })

  describe('QuickLog', () => {
    it('submits a workout when button is clicked', async () => {
      render(<QuickLog />)
      
      const exerciseInput = screen.getByPlaceholderText('Search Database...')
      const setsInput = screen.getByLabelText('SETS')
      const repsInput = screen.getByLabelText('REPS')
      const loadInput = screen.getByLabelText('LOAD (KG)')
      const submitButton = screen.getByText('Commit_Sequence')

      fireEvent.change(exerciseInput, { target: { value: 'Deadlift' } })
      fireEvent.change(setsInput, { target: { value: '3' } })
      fireEvent.change(repsInput, { target: { value: '5' } })
      fireEvent.change(loadInput, { target: { value: '140' } })

      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(logWorkout).toHaveBeenCalledWith({
          exerciseName: 'Deadlift',
          sets: 3,
          reps: 5,
          weight: 140,
        })
      })

      // Inputs should be cleared
      expect(exerciseInput).toHaveValue('')
    })
  })
})

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Adrian',
        likes: 0,
        url: 'adrianserbanescu.com',
        user: {
            username: 'adrianaris',
            name: 'Adrian' 
        }
    }
    
    const user = {
        username: 'adrianaris',
        name: 'Adrian'
    }

    beforeEach(() => {
        component = render(
            <Blog
                blog={blog}
                user={user}
            />
        )
    })

    test('renders content', () => {
        const button = component.container.querySelector('button')
        
        expect(component.container).toHaveTextContent(
            'Component testing is done with react-testing-library'
        )
        
        const div = component.container.querySelector('.blog')
        expect(div).toHaveTextContent(
            'Component testing is done with react-testing-library'
        )
    })
    
    test('hiddent content not displayed', () => {
        const div = component.container.querySelector('.hiddenContent')
        expect(div).toHaveStyle('display:none')
    })
    
    test('hiddent content is displayed after pressing button', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
        
        const div = component.container.querySelector('.hiddenContent')
        expect(div).not.toHaveStyle('display:none')
    })
})

test('cliking the button calls event handler', () => {
        const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Adrian',
        likes: 0,
        url: 'url',
        user: {
            username: 'adrianaris',
            name: 'Adrian' 
        }
    }
    
    const user = {
        username: 'adrianaris',
        name: 'Adrian'
    }
    
    const mockHandler = jest.fn()
    const mockLike = jest.fn()
    
    const component = render(
        <Blog 
            blog={blog} 
            user={user}
            addLike={mockLike}
            handleDeleteBlog={mockHandler}
        />
    )
    
    const button = component.getByText('remove')
    fireEvent.click(button)
    
    expect(mockHandler.mock.calls).toHaveLength(1)
    
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    
    expect(mockLike.mock.calls).toHaveLength(2)
})

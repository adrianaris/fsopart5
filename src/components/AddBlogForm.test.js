import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlogForm from './AddBlogForm'

test('<AddBlogForm /> updates parent state and calls onSubmit', () => {
    const addBlog = jest.fn()

    const component = render(
        <AddBlogForm addBlog={addBlog} />
    )
    
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
    
    
    fireEvent.change(title, {
        target: { value: 'test title' }
    })
    fireEvent.change(author, {
        target: { value: 'test author' }
    })
    fireEvent.change(url, {
        target: { value: 'test url' }
    })
    const blog = {
        title: title.value,
        author: author.value,
        url: url.value
    }
    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0]).toEqual(blog)
})
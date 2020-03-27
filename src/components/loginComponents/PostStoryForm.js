import React from 'react';
import { Formik } from 'formik';
import closeIcon from '../../images/x.svg';
import './PostStoryForm.css';

export default function PostStoryForm({
  setOpenPostStoryForm,
}) {
  const closeForm = () => {
    setOpenPostStoryForm(false)
  }
  return (
    <section className="story-form-wrapper">
      <Formik
        initialValues={{
          storyTitle: '',
          storyLink: '',
        }}
        onSubmit={(values) => {
          console.log('submitting', values);
          closeForm();
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <form onSubmit={handleSubmit}>
            <header>
              <p className="">Post New Story</p>
              <div className="close-btn">
                <img
                  src={closeIcon}
                  alt="close post story form"
                  onClick={closeForm}
                />
              </div>
            </header>
            <div className="form-body">
              <label htmlFor="storyTitle">Title</label>
              <input
                id="storyTitle"
                name="storyTitle"
                type="text"
                onChange={handleChange}
                value={values.storyTitle}
                placeholder="Story Title"
              />
              <label htmlFor="storyLink">Link</label>
              <input
                id="storyLink"
                name="storyLink"
                type="text"
                onChange={handleChange}
                value={values.storyLink}
                placeholder="Story Hyperlink"
              />
            </div>
            <footer>
              <button className="post-story" type="submit">Post</button>
            </footer>
          </form>
        )}
      </Formik>
    </section>
  );
}
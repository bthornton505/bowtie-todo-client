import React from 'react';
import Button from './Button';

const LandingPage = () => {
  return(
    <div className="border border-secondary p-4 rounded-lg">
      <h2 className="text-center p-3">Get Organized!</h2>
      <hr></hr>
      <p className="text-center">
        Keep track of your projects and never miss a deadline.
      </p>

      <div className="flex-row text-center pt-4">
        <Button path={'/signup'} buttonText={'Sign Up'}/>
        <Button path={'/login'} buttonText={'Login'}/>
      </div>
    </div>
  )
}

export default LandingPage;

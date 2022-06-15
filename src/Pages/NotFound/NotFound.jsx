import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../Context/Theme-Context';

const NotFound = () => {
    const { themeObject } = useTheme();
    return (
      <div>
        <div
          style={{
            color: themeObject.text,
            backgroundColor: themeObject.primary,
          }}
          className="not-found"
        >
          404 Not Found🗒️{" "}
          <Link to="/" className="button m-8 p-4  txt-2xl txt-bold bg-violet-400 rounded-m">
            Go Back
          </Link>
        </div>
      </div>
    );
}

export default NotFound
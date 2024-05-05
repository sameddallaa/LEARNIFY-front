function LoadingAnimation({ classProp }) {
  return (
    <div className={`flex ${classProp}  gap-2`}>
      <div className="animate-spin rounded-full bg-gradient-to-tr from-cyanT via-blueT to-blue-500 p-4">
        <div className="rounded-full bg-white">
          <div className="h-16 w-16 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingAnimation;

import React from "react";
import { DemoCard } from "./DemoCard";
import "./MixedBaselineDemo.css";

export const MixedBaselineDemo: React.FC = () => {
  return (
    <div>
      <DemoCard
        title="Modern Web App Layout"
        description="This example shows a typical modern web app that uses a mix of widely supported, newly supported, and experimental CSS features."
        baseline="widely"
      >
        <div className="app-layout">
          <header className="app-header">
            <h1>App Header</h1>
            <nav className="app-nav">
              <a href="#" className="nav-link">
                Home
              </a>
              <a href="#" className="nav-link">
                About
              </a>
              <a href="#" className="nav-link">
                Contact
              </a>
            </nav>
          </header>

          <main className="app-main">
            <aside className="app-sidebar">
              <h3>Sidebar</h3>
              <p>This uses widely supported flexbox.</p>
            </aside>

            <section className="app-content">
              <h2>Main Content</h2>
              <div className="content-grid">
                <div className="content-card">Card 1</div>
                <div className="content-card">Card 2</div>
                <div className="content-card">Card 3</div>
                <div className="content-card">Card 4</div>
              </div>
            </section>
          </main>

          <footer className="app-footer">
            <p>Footer with mixed CSS features</p>
          </footer>
        </div>
      </DemoCard>

      <DemoCard
        title="Interactive Components"
        description="These components demonstrate various CSS features with different baseline support levels."
        baseline="newly"
      >
        <div className="interactive-demo">
          <button className="modern-button">Modern Button</button>
          <div className="hover-card">
            <h4>Hover Card</h4>
            <p>Hover to see effects</p>
          </div>
          <div className="gradient-text">Gradient Text</div>
        </div>
      </DemoCard>
    </div>
  );
};

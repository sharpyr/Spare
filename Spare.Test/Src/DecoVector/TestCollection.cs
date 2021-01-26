﻿using System;
using NUnit.Framework;
using Spare.Deco;
using Spare.Logger;
using Veho.Matrix;

namespace Spare.Test.DecoVector {
  [TestFixture]
  public class TestCollection {
    [Test]
    public void DecoVectorTest() {
      var elements = new[] {1, 2, 3};
      elements.Deco().Logger();
      Assert.True(true);
    }
    [Test]
    public void DecoMatrixTest() {
      var elements = Inits.Init(3, 5, (i, j) => Math.Pow(10, i * 2 + 1) + (j + 1));
      elements.Deco().Logger();
      Assert.True(true);
    }
    [Test]
    public void DecoMatrix1BTest() {
      var elements = (3, 5).M1B<int>();
      elements.Deco().Logger();
      Assert.True(true);
    }
  }
}